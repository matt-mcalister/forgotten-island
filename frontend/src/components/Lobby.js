import React from "react";
import GamesContainer from "./GamesContainer"
import NewGameForm from "./NewGameForm"

class Lobby extends React.Component {

  render() {
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
export default Lobby
