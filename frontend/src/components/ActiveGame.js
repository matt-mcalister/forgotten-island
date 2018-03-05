import React from "react";
import { connect } from "react-redux";
import Tile from "./Tile"
import UserGameInfo from "./UserGameInfo"
import TeamGameInfo from "./TeamGameInfo"
import ReadyUp from "./ReadyUp"
import TeamChat from "./TeamChat"
import PlayerToken from "./PlayerToken"
import { ActionCable } from 'react-actioncable-provider';
import { addActiveGameUsers, removeActiveGameUsers, addMessage, beginGame, updateGame, handleShoredTile } from "../actions"



class ActiveGame extends React.Component {

  handleReceivedData = (data) => {
    if (data.active_game) {
      this.props.addActiveGameUsers(data)
    } else if (data.removed_active_game){
      this.props.removeActiveGameUsers(data.removed_active_game)
    } else if (data.message) {
      this.props.addMessage(data)
    } else if (data.game_in_session) {
      this.props.beginGame(data.game_in_session)
    } else if (data.new_turn) {
      this.props.updateGame(data.new_turn)
    }
  }

  render() {
    return (
      <div className="active-game">
        {this.props.id && (<ActionCable
         channel={{ channel: 'ActiveGamesChannel', game_id: this.props.id }}
         onReceived={this.handleReceivedData}
         />)}
        <div className="ocean" style={{"opacity":`${this.props.water_level/10}`}} />
        <div className="board">
          {this.props.tiles && this.props.tiles.map(tile => <Tile key={tile.tile.id} tile={tile.tile}/>)}
          {!!this.props.active_games && this.props.active_games.map(ag => <PlayerToken key={ag.active_game.id} {...ag.active_game}/> )  }
        </div>
        <TeamChat />
        {this.props.in_session ? <UserGameInfo /> : <ReadyUp /> }
        {this.props.in_session && <TeamGameInfo /> }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return ({ ...state.activeGame.game,
  tiles: state.activeGame.tiles,
  in_session: state.activeGame.in_session,
  currentUser: state.currentUser.currentUser,
  active_games: state.activeGame.active_games,
  water_level: state.activeGame.game.water_level})
 }

const connectedActiveGame = connect(mapStateToProps, { addActiveGameUsers, removeActiveGameUsers, addMessage, beginGame, updateGame, handleShoredTile })(ActiveGame)

export default connectedActiveGame
