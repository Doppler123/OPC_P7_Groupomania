import { useState } from "react"
import Button from "../Button"
import axios from "axios"

import "./postForm.scss"

function PostForm() {
  const [inputValue, setInputValue] = useState("")
  const [imageName, setImageName] = useState("")

  const onInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const onFormSubmit = (event) => {
    event.preventDefault() // to prevent refreshing the page every time we submit message

    const newPost = new FormData()
    newPost.append("post_text", inputValue)
    newPost.append("post_imageName", imageName)
    newPost.append(
      "post_imageFile",
      document.getElementById("post_imageFile").files[0]
    )

    axios.defaults.headers.post["Content-Type"] = "application/json"
    axios.defaults.timeout = 6000
    axios.defaults.withCredentials = true

    axios
      .post("http://localhost:8000/api/posts/", newPost)
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

  const imageChoosedOnInput = (e) => {
    setImageName(document.getElementById("post_imageFile").files[0].name)
  }

  return (
    <div className="input-group" id="postForm">
      <form
        onSubmit={onFormSubmit}
        method="POST"
        action="/api/posts"
        encType="multipart/form-data"
        className="form-control"
      >
        <p>Publier un nouveau post :</p>
        <input
          type="text"
          size="100"
          placeholder="Contenu du post"
          id="post_text"
          name="post_text"
          onChange={onInputChange}
          value={inputValue}
          className="form-control"
        />
        <input
          type="file"
          accept=".png, .jpg, .jpeg, .webp"
          id="post_imageFile"
          name="post_imageFile"
          onInput={imageChoosedOnInput}
          className="form-control"
        />

        <div>
          {imageName ? (
            <Button name="Publier" />
          ) : (
            <div id="noFile">
              <p>
                Il faut choisir un fichier image pour pouvoir publier un nouveau
                post (formats .png, .webp, .jpg ou .jpeg acceptés)!
              </p>
            </div>
          )}
        </div>
      </form>
      <hr />
    </div>
  )
}

export default PostForm
