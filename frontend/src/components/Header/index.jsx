import { Link } from "react-router-dom"
import { useState } from "react"

import "./header.scss"

function Header() {
  console.log(window.location.pathname)
  const [currentPage, setCurrentPage] = useState("")

  const onLinkToHomeClick = async () => {
    await setCurrentPage("/")
  }

  const onLinkToAuthClick = async () => {
    await setCurrentPage("/authentification")
  }

  const onLinkToFeedClick = async () => {
    await setCurrentPage("/feed")
  }

  return (
    <header className="card text-center">
      <img
        src="../../images/logos/icon-left-font-monochrome-black.svg"
        alt="Logo Groupomania"
      />

      <div className="row align-items-center">
        <div className="col">
          <h1>Réseau social interne</h1>
        </div>
      </div>
      <nav>
        <ul className="row align-items-center">
          {currentPage === "/" || currentPage === "" ? null : (
            <li className="col">
              <Link to="/" onClick={onLinkToHomeClick}>
                Accueil
              </Link>
            </li>
          )}
          {currentPage === "/authentification" ? null : (
            <li className="col">
              <Link to="/authentification" onClick={onLinkToAuthClick}>
                Connection / Inscription
              </Link>
            </li>
          )}
          {currentPage === "/feed" ? null : (
            <li className="col">
              <Link to="/feed" onClick={onLinkToFeedClick}>
                Discussions
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header
