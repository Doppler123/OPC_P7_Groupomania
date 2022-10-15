import { Link } from "react-router-dom"

const PostNumber = ({ postNumber }) => {
  const url = "/onepost/" + postNumber
  return <Link to={url}>Post n°{postNumber}:</Link>
}

export default PostNumber
