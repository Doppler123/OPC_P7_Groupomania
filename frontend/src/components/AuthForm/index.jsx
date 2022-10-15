import { useState, useRef } from "react"
import Button from "../Button"
import axios from "axios"

import "./authForm.scss"

function AuthForm() {
  const [userLogin, setUserLogin] = useState({
    user_email: "",
    user_password: "",
  })

  const [userSignup, setUserSignup] = useState({
    user_email: "",
    user_password: "",
    user_firstName: "",
    user_lastName: "",
  })

  const [loginError, setLoginError] = useState("")
  const [accountCreated, setAccountCreated] = useState(false)

  const signupEmailRef = useRef()
  const signupEmailRefError = useRef()

  const signupPasswordRef = useRef()
  const signupPasswordRefError = useRef()

  const signupFirstNameRef = useRef()
  const signupFirstNameRefError = useRef()

  const signupLastNameRefError = useRef()

  const { user_firstName, user_lastName } = userSignup

  const emailCheck = (email) => {
    if (email.trim() === "") {
      signupEmailRefError.current.innerText = ""
    } else {
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      const check = regex.test(String(email).toLowerCase())
      signupEmailRefError.current.innerText = `${
        check ? "" : "Cette adresse mail n'a pas un format valide"
      }`
      if (check) return true
    }
  }

  const passwordCheck = (password) => {
    if (password.trim() === "") {
      signupPasswordRefError.current.innerText = ""
    } else {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/ // regex pour mot de passe avec au minimum 8 caractères, 1 chiffre, 1 majuscule, 1 minuscule
      const check = regex.test(String(password))
      signupPasswordRefError.current.innerText = `${
        check
          ? ""
          : "Ce mot de passe n'a pas un format valide (il faut au minimum 8 caractères, 1 chiffre, 1 majuscule, 1 minuscule)"
      }`
      if (check) return true
    }
  }

  const checkFirstName = () => {
    if (user_firstName.trim() === "") {
      signupFirstNameRefError.current.innerText = ""
    } else if (
      user_firstName.trim().length < 2 ||
      user_firstName.trim().length > 20
    ) {
      signupFirstNameRefError.current.innerText =
        "Votre prénom doit avoir 2 caractères au minimum et 20 au maximum"
    } else {
      signupFirstNameRefError.current.innerText = ""
      return true
    }
  }

  const checkLastName = () => {
    if (user_lastName.trim() === "") {
      signupLastNameRefError.current.innerText = ""
    } else if (
      user_lastName.trim().length < 2 ||
      user_lastName.trim().length > 20
    ) {
      signupLastNameRefError.current.innerText =
        "Votre nom doit avoir 2 caractères au minimum et 20 au maximum"
    } else {
      signupLastNameRefError.current.innerText = ""
      return true
    }
  }

  const login = (event) => {
    event.preventDefault() // to prevent refreshing the page every time we submit message

    axios.defaults.headers.post["Content-Type"] = "application/json"
    axios.defaults.timeout = 6000
    axios.defaults.withCredentials = true

    axios
      .post("http://localhost:8000/api/auth/login", userLogin)
      .then((response) => {
        if (!response.data.error) {
          localStorage.setItem("userData", JSON.stringify(response.data.user))
          document.location.reload()
        } else {
          setLoginError(response.data.message)
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
  }

  const signup = (event) => {
    event.preventDefault() // to prevent refreshing the page every time we submit message

    if (
      checkFirstName() &&
      checkLastName() &&
      emailCheck(signupEmailRef.current.value) &&
      passwordCheck(signupPasswordRef.current.value)
    ) {
      axios.defaults.headers.post["Content-Type"] = "application/json"
      axios.defaults.timeout = 6000
      axios.defaults.withCredentials = true

      axios
        .post("http://localhost:8000/api/auth/signup", userSignup)
        .then((response) => {
          if (response.status === 200) {
            signupEmailRefError.current.innerText =
              "Il existe déja un compte utilisant cet email"
          }
          if (response.status === 201) {
            setAccountCreated(true)
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
    }
  }

  const bearerCookie = document.cookie

  return (
    <div>
      {bearerCookie ? (
        <div></div>
      ) : (
        <div className="input-group" id="authForm">
          <form onSubmit={login} className="form-control">
            <h2 className="h3 mb-3 fw-normal">Connectez vous :</h2>
            <div className="form-floating">
              <input
                type="email"
                placeholder="Adresse mail"
                name="user_email"
                onChange={(e) =>
                  setUserLogin({
                    ...userLogin,
                    user_email: e.target.value,
                  })
                }
                value={userLogin.user_email}
                className="form-control"
                id="floatingInput"
              />
              <label id="floatingInput">Adresse Email :</label>
            </div>

            <div className="form-floating">
              <input
                type="password"
                placeholder="Mot de passe"
                name="user_password"
                onChange={(e) =>
                  setUserLogin({
                    ...userLogin,
                    user_password: e.target.value,
                  })
                }
                value={userLogin.user_password}
                className="form-control"
                id="floatingInput"
              />
              <label id="floatingInput">Mot de passe :</label>
              <div className="wrongFormat">{loginError}</div>
            </div>

            <Button name="Connexion" />
          </form>

          <div className="input-group">
            <form onSubmit={signup} className="form-control">
              <h2 className="h3 mb-3 fw-normal">Inscrivez vous :</h2>
              <div className="form-floating">
                <input
                  type="email"
                  placeholder="Adresse mail"
                  name="user_email"
                  onChange={(e) =>
                    setUserSignup({
                      ...userSignup,
                      user_email: e.target.value,
                    })
                  }
                  onBlur={(e) => emailCheck(e.target.value)}
                  value={userSignup.user_email}
                  ref={signupEmailRef}
                  className="form-control"
                  id="floatingInput"
                />
                <div className="wrongFormat" ref={signupEmailRefError}></div>
                <label id="floatingInput">Adresse email :</label>
              </div>

              <div className="form-floating">
                <input
                  type="password"
                  placeholder="Mot de passe"
                  name="user_password"
                  onChange={(e) => {
                    setUserSignup({
                      ...userSignup,
                      user_password: e.target.value,
                    })
                  }}
                  value={userSignup.user_password}
                  ref={signupPasswordRef}
                  className="form-control"
                  id="floatingInput"
                />
                <div className="wrongFormat" ref={signupPasswordRefError}></div>
                <label id="floatingInput">Mot de passe :</label>
              </div>

              <div className="form-floating">
                <input
                  type="text"
                  placeholder="Prénom"
                  name="user_firstName"
                  onChange={(e) =>
                    setUserSignup({
                      ...userSignup,
                      user_firstName: e.target.value,
                    })
                  }
                  onBlur={checkFirstName}
                  value={userSignup.user_firstName}
                  ref={signupFirstNameRef}
                  className="form-control"
                  id="floatingInput"
                />
                <div
                  className="wrongFormat"
                  ref={signupFirstNameRefError}
                ></div>
                <label id="floatingInput">Prénom</label>
              </div>

              <div className="form-floating">
                <input
                  type="text"
                  placeholder="Nom"
                  name="user_lastName"
                  onChange={(e) =>
                    setUserSignup({
                      ...userSignup,
                      user_lastName: e.target.value,
                    })
                  }
                  onBlur={checkLastName}
                  value={userSignup.user_lastName}
                  className="form-control"
                  id="floatingInput"
                />
                <div className="wrongFormat" ref={signupLastNameRefError}></div>
                <label id="floatingInput">Nom :</label>
              </div>
              <Button name="Inscription" />
              <div id="accountCreated">
                {accountCreated &&
                  "Votre compte a bien été créé. Vous pouvez maintenant vous connecter !"}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AuthForm
