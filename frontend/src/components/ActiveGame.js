import React from "react";
import { connect } from "react-redux";
import LoggedIn from "../hoc/LoggedIn"
import Tile from "./Tile"
import WaterLevel from "./WaterLevel"
import GameInfo from "./GameInfo"
import ReadyUp from "./ReadyUp"
// import FloodCards from "./FloodCards"
// import TreasureCards from "./TreasureCards"
import TeamChat from "./TeamChat"
import PlayerToken from "./PlayerToken"
import { ActionCable } from 'react-actioncable-provider';
import { addActiveGameUsers, removeActiveGameUsers, addMessage } from "../actions"



class ActiveGame extends React.Component {

  handleReceivedData = (data) => {
    if (data.active_game){
      this.props.addActiveGameUsers(data)
    } else if (data.removed_active_game){
      this.props.removeActiveGameUsers(data.removed_active_game)
    } else if (data.message) {
      this.props.addMessage(data)
    }
  }

  render() {
    return (
      <div className="active-game">
        {this.props.id && (<ActionCable
         channel={{ channel: 'ActiveGamesChannel', game_id: this.props.id }}
         onReceived={this.handleReceivedData}
         />)}
        <WaterLevel />
        <div className="board">
          {this.props.tiles && this.props.tiles.map(tile => <Tile key={tile.id} tile={tile}/>)}
          {!!this.props.active_games && this.props.active_games.map(ag => <PlayerToken key={ag.active_game.id} {...ag.active_game}/> )  }
        </div>
        <TeamChat />
        {(this.props.in_session) ? <GameInfo /> : <ReadyUp /> }
      </div>
    )
  }
}

const connectedActiveGame = connect(state => ({ ...state.activeGame.game, in_session: state.activeGame.in_session, currentUser: state.currentUser.currentUser, active_games: state.activeGame.active_games }), { addActiveGameUsers, removeActiveGameUsers, addMessage })(ActiveGame)

export default LoggedIn(connectedActiveGame)
