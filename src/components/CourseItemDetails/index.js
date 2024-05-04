import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {
  ItemCard,
  ItemImage,
  TextCard,
  ItemHeading,
  ItemPara,
  FailureCard,
  FailureImage,
  FailureHeading,
  FailurePara,
  FailureButton,
} from './StyledComponents'

import Header from '../Header'

const apiconstants = {
  initial: 'Initial',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseItemDetails extends Component {
  state = {
    apistatus: apiconstants.initial,
    courseDetails: {},
  }

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({apistatus: apiconstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formatData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }

      this.setState({
        courseDetails: formatData,
        apistatus: apiconstants.success,
      })
    } else {
      this.setState({apistatus: apiconstants.failure})
    }
  }

  renderSuccessview = () => {
    const {courseDetails} = this.state
    return (
      <ItemCard>
        <ItemImage src={courseDetails.imageUrl} alt={courseDetails.name} />
        <TextCard>
          <ItemHeading>{courseDetails.name}</ItemHeading>
          <ItemPara>{courseDetails.description}</ItemPara>
        </TextCard>
      </ItemCard>
    )
  }

  retryFetch = () => {
    this.getCourseDetails()
  }

  renderFailureview = () => (
    <FailureCard>
      <FailureImage
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <FailureHeading>Oops! Something Went Wrong</FailureHeading>
      <FailurePara>
        We cannot seem to find the page you are looking for
      </FailurePara>
      <FailureButton type="button" onClick={this.retryFetch}>
        Retrty
      </FailureButton>
    </FailureCard>
  )

  renderany = () => {
    const {apistatus} = this.state

    switch (apistatus) {
      case apiconstants.success:
        return this.renderSuccessview()
      case apiconstants.failure:
        return this.renderFailureview()
      case apiconstants.inProgress:
        return (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderany()}
      </>
    )
  }
}

export default CourseItemDetails
