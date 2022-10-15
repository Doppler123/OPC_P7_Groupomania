import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import "./utils/style/globalStyleSettings.scss"

import Header from "./components/Header"
import Footer from "./components/Footer"
import Error from "./components/Error"

import Home from "./pages/Home"
import Authentification from "./pages/Authentification"
import Feed from "./pages/Feed"
import OnePost from "./pages/OnePost"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Header />
      <hr />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/authentification">
          <Authentification />
        </Route>
        <Route path="/feed">
          <Feed />
        </Route>
        <Route path="/onepost/:post_id">
          <OnePost />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
      <hr />
      <Footer />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
)
