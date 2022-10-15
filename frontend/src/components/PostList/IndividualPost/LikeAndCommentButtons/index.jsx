import { useState, useEffect } from "react"
import axios from "axios"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCommentAlt, faThumbsUp } from "@fortawesome/free-solid-svg-icons"

import CommentsList from "../../../CommentsList"
import CommentForm from "../../../CommentForm"

import "./likeAndCommentButtons.scss"

const LikeAndCommentButtons = ({ postId }) => {
  const [likeNumbers, setLikeNumbers] = useState(0)
  const [isPostLiked, setIsPostLiked] = useState(false)
  const [isShown, setIsShown] = useState(false)

  const likeHandle = async () => {
    const data = {
      userId: JSON.parse(localStorage.getItem("userData")).user_id,
      postId: postId,
    }

    axios.defaults.headers.post["Content-Type"] = "application/json"
    axios.defaults.timeout = 6000
    axios.defaults.withCredentials = true
    axios
      .patch("http://localhost:8000/api/posts/:id/likeInteractions", data)
      .then((response) => {
        console.log(response)
        document.location.reload()
      })
      .catch((error) => {
        alert("Une erreur est survenue")
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
  }

  useEffect(() => {
    const data = {
      postId,
      userId: JSON.parse(localStorage.getItem("userData")).user_id,
    }
    axios.defaults.headers.post["Content-Type"] = "application/json"
    axios.defaults.timeout = 6000
    axios.defaults.withCredentials = true
    axios
      .post("http://localhost:8000/api/posts/:id/isPostLikedByUser", data)
      .then((response) => {
        if (response.data[0]) {
          setIsPostLiked(true)
        } else {
          setIsPostLiked(false)
        }
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

  useEffect(() => {
    axios.defaults.headers.post["Content-Type"] = "application/json"
    axios.defaults.timeout = 6000
    axios.defaults.withCredentials = true
    axios
      .post("http://localhost:8000/api/posts/:id/likeInteractions", { postId })
      .then((response) => {
        const likeNumbers = response.data[0].total
        setLikeNumbers(likeNumbers)
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

  const commentHandle = (event) => {
    setIsShown((current) => !current)
  }

  return (
    <div>
      <div id="likeCounter">
        <FontAwesomeIcon
          icon={faThumbsUp}
          color={"blue"}
          className="thumbIcon"
        />
        {likeNumbers}
      </div>
      <div>
        <button onClick={likeHandle} className="btn btn-secondary">
          <span>
            <FontAwesomeIcon
              icon={faThumbsUp}
              color={isPostLiked ? "blue" : "white"}
            />
          </span>
          J'aime
        </button>
        <div>
          <button onClick={commentHandle} className="btn btn-secondary">
            <span>
              <FontAwesomeIcon
                icon={faCommentAlt}
                color={isShown ? "blue" : "white"}
              />
            </span>
            Commentaires
          </button>
          {isShown && (
            <div>
              <CommentsList postId={postId} />
              <CommentForm postId={postId} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LikeAndCommentButtons
