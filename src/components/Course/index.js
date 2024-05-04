import {Link} from 'react-router-dom'

import {List, CourseImage, CoursePara} from './StyledComponents'

const Course = props => {
  const {details} = props
  const {id, name, logoUrl} = details
  return (
    <Link to={`/courses/${id}`}>
      <List>
        <CourseImage src={logoUrl} alt={name} />
        <CoursePara>{name}</CoursePara>
      </List>
    </Link>
  )
}

export default Course
