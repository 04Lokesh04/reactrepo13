import {NotCard, NotImage, NotHeading, NotPara} from './StyledComponents'
import Header from '../Header'

const NotFound = () => (
  <>
    <Header />
    <NotCard>
      <NotImage
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
      />
      <NotHeading>Page Not Found</NotHeading>
      <NotPara>
        We are sorry, the page you requested could not be found"
      </NotPara>
    </NotCard>
  </>
)

export default NotFound
