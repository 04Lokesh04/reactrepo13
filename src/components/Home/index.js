import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {
  Main,
  Heading1,
  CoursersList,
  FailureCard,
  FailureImage,
  FailureHeading,
  FailurePara,
  FailureButton,
} from './StyledComponents'
import Header from '../Header'
import Course from '../Course'

const apiconstants = {
  initial: 'Initial',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {courseList: [], apistatus: apiconstants.initial}

  componentDidMount() {
    this.getCouresList()
  }

  getCouresList = async () => {
    this.setState({apistatus: apiconstants.inProgress})

    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formatData = data.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))

      this.setState({courseList: formatData, apistatus: apiconstants.success})
    } else {
      this.setState({apistatus: apiconstants.failure})
    }
  }

  renderSuccessview = () => {
    const {courseList} = this.state
    return (
      <>
        <Heading1>Courses</Heading1>
        <CoursersList>
          {courseList.map(each => (
            <Course details={each} key={each.id} />
          ))}
        </CoursersList>
      </>
    )
  }

  retryFetch = () => {
    this.getCouresList()
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
        <Main>{this.renderany()}</Main>
      </>
    )
  }
}

export default Home
