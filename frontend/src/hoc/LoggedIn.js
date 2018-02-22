import React from "react";
import { Redirect } from "react-router-dom"

const LoggedIn = (Component) => {
  return (props) => {
    console.log("component: ", Component)
    console.log("props: ", props)
    return ((props.currentUser) ? <Component {...props}/> : <Redirect to="/login" />)
  }
}

export default LoggedIn
