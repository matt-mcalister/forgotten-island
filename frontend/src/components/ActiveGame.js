import React from "react";
import { connect } from "react-redux";
import LoggedIn from "../hoc/LoggedIn"
import Tile from "./Tile"
import WaterLevel from "./WaterLevel"
// import FloodCards from "./FloodCards"
// import TreasureCards from "./TreasureCards"
import TeamChat from "./TeamChat"
import { ActionCable } from 'react-actioncable-provider';



class ActiveGame extends React.Component {

  componentDidMount(){
    
  }

  handleReceivedInformation = (info) => {
    debugger
  }

  render() {
    console.log("activegame props: ", this.props)
    return (
      <div className="active-game">
        <ActionCable
         channel={{ channel: 'ActiveGamesChannel', game_id: this.props.id }}
         onReceived={this.handleReceivedInformation}
         />
        <WaterLevel />
        <div className="board">
          {this.props.tiles.map(tile => <Tile key={tile.id} tile={tile}/>)}
        </div>
        <TeamChat />
      </div>
    )
  }
}

const connectedActiveGame = connect(state => ({ ...state.activeGame.game, currentUser: state.currentUser.currentUser }))(ActiveGame)

export default LoggedIn(connectedActiveGame)
