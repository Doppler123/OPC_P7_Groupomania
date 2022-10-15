import { useState, useEffect } from "react"
import axios from "axios"

import IndividualPost from "./IndividualPost"

function PostList() {
  const [postData, setPostData] = useState([])

  useEffect(() => {
    axios.defaults.headers.post["Content-Type"] = "application/json"
    axios.defaults.timeout = 6000
    axios.defaults.withCredentials = true
    axios
      .get("http://localhost:8000/api/posts/")
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
  }, [])

  return (
    <div>
      {postData.map((post) => {
        return <IndividualPost post={post} key={post.post_id} />
      })}
    </div>
  )
}

export default PostList
