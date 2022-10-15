import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCancel } from "@fortawesome/free-solid-svg-icons"

import "./logOutButton.scss"

const logOut = async () => {
  document.cookie = "bearerToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC "
  localStorage.clear()
  document.location.reload()
}

let data = {}
localStorage.getItem("userData")
  ? (data = {
      userEmail: JSON.parse(localStorage.getItem("userData")).user_email,
      userFirstName: JSON.parse(localStorage.getItem("userData"))
        .user_firstName,
      userLastName: JSON.parse(localStorage.getItem("userData")).user_lastName,
    })
  : (data = {})

const LogOutButton = () => {
  return (
    <div className="card text-center" id="logOut">
      <p>
        Vous êtes connecté en tant que: {data.userFirstName} {data.userLastName}{" "}
        ({data.userEmail})
      </p>
      <button onClick={logOut} className="btn btn-danger">
        <span>
          <FontAwesomeIcon icon={faCancel} color={"black"} />
        </span>
        Déconnexion
      </button>
    </div>
  )
}

export default LogOutButton
