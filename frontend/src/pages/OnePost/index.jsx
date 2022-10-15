import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import IndividualPost from "../../components/PostList/IndividualPost"
import LogOutButton from "../../components/LogOutButton"

import "./onePost.scss"

function OnePost() {
  let { post_id } = useParams()
  const [postData, setPostData] = useState([])
  useEffect(() => {
    axios.defaults.headers.post["Content-Type"] = "application/json"
    axios.defaults.timeout = 6000
    axios.defaults.withCredentials = true
    axios
      .get("http://localhost:8000/api/posts/" + post_id)
      .then((response) => {
        setPostData(response.data)
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          console.log(error.request)
        } else {
          console.log("Error", error.message)
        }
        console.log(error.config)
      })
  }, [post_id])

  const bearerCookie = document.cookie

  return (
    <div>
      {bearerCookie ? <LogOutButton /> : <div></div>}
      <hr />
      <Link to="/feed">
        <div id="linkToPostList">
          <FontAwesomeIcon
            icon={faArrowLeft}
            color={"black"}
            id="arrowLeftIcon"
          />
          Revenir à la liste des discussions
        </div>
      </Link>
      <hr />
      {postData.map((post) => {
        return <IndividualPost post={post} key={post.post_id} />
      })}
      <span></span>
    </div>
  )
}

export default OnePost
