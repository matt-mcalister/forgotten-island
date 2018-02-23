import React from "react";
import { connect } from "react-redux";
import LoggedIn from "../hoc/LoggedIn"
import Tile from "./Tile"


class ActiveGame extends React.Component {

  render() {
    console.log("activegame props: ", this.props)
    return (
      <div>
        <h1>Your game begins now!</h1>
        <div className="board">
          {this.props.tiles.map(tile => <Tile key={tile.id} tile={tile}/>)}
        </div>
      </div>
    )
  }
}
export default connect(state => ({ ...state.activeGame.game, currentUser: state.currentUser.currentUser }))(ActiveGame)
