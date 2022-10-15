import { useState, useEffect } from "react"
import axios from "axios"

import IndividualComment from "./IndividualComment"

import "./commentsList.scss"

function CommentsList({ postId }) {
  const [commentData, setCommentData] = useState([])

  useEffect(() => {
    axios.defaults.headers.post["Content-Type"] = "application/json"
    axios.defaults.timeout = 6000
    axios.defaults.withCredentials = true
    axios
      .get("http://localhost:8000/api/comments/" + postId)
      .then((response) => {
        setCommentData(response.data)
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
  }, [postId])

  return (
    <div>
      <div id="commentsNumber">
        Il y a {commentData.length}
        {commentData.length > 1 ? " commentaires :" : " commentaire"}
      </div>
      {commentData.map((comment) => {
        return <IndividualComment comment={comment} key={comment.comment_id} />
      })}
    </div>
  )
}

export default CommentsList
