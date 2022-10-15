import axios from "axios"

import "./deleteButton.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"

const DeleteButton = ({ post_id }) => {
  const deletePost = () => {
    axios.defaults.headers.post["Content-Type"] = "application/json"
    axios.defaults.timeout = 6000
    axios.defaults.withCredentials = true

    axios
      .delete("http://localhost:8000/api/posts/" + post_id)

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

  return (
    <button onClick={deletePost} className="btn btn-danger" id="deleteButton">
      <span>
        <FontAwesomeIcon icon={faTrashCan} color={"white"} />
      </span>
      Supprimer la publication
    </button>
  )
}

export default DeleteButton
