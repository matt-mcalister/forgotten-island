import React from "react";
import GamesContainer from "./GamesContainer"
import NewGameForm from "./NewGameForm"
import { connect } from "react-redux"
import LoggedIn from "../hoc/LoggedIn"
import { withRouter } from "react-router-dom"

class Lobby extends React.Component {

  render() {
    console.log("reached lobby")
    return (
      <div id="lobby">
        <div id="lobby-welcome-message">
        <h1>Welcome!</h1>
        </div>
        <NewGameForm/>
        <GamesContainer />
      </div>
    )
  }
}

const connectedLobby = connect(state => ({ currentUser: state.currentUser.currentUser }) )(Lobby)

export default LoggedIn(connectedLobby)
