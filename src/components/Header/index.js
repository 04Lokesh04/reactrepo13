import {Link} from 'react-router-dom'

import {HeaderCard, HeaderImage} from './StyledComponents'

const Header = () => (
  <HeaderCard>
    <Link to="/">
      <HeaderImage
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
      />
    </Link>
  </HeaderCard>
)

export default Header
