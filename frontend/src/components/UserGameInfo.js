import React from "react";
import { connect } from "react-redux"
import CurrentTurnInterface from "./CurrentTurnInterface"
import Inventory from "./Inventory"
import { userMustDiscard, removeTemporaryMessages, userMustRelocate } from "../actions"

class UserGameInfo extends React.Component {
  componentDidUpdate(){
    if (!this.props.hide_interface){
      if (this.props.currentUserActiveGame["must_discard?"]) {
        this.props.userMustDiscard()
      } else if (this.props.giveTreasureAction){
        return null
      } else if (this.props.currentUserActiveGame["must_relocate?"]){
        this.props.userMustRelocate()
      } else {
        this.props.removeTemporaryMessages()
      }
    }
  }

  render(){
    return (
      <div className="active-game-bottom game-info">
        {((!this.props.hide_interface && this.props.currentUserActiveGame["is_users_turn?"]) || this.props.currentUserActiveGame["must_relocate?"]) && <CurrentTurnInterface active_game={this.props.currentUserActiveGame}/>}
        <div className="user-inventory-container">
          <Inventory key={this.props.currentUserActiveGame.id} currentUserActiveGame={this.props.currentUserActiveGame} {...this.props.currentUserActiveGame}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    giveTreasureAction: state.activeGame.giveTreasureAction,
    currentUserActiveGame: state.activeGame.active_games[state.currentUser.activeGameId],
    hide_interface: state.activeGame.game["halt_game?"] || state.activeGame.game.end_game
  }
}
export default connect(mapStateToProps, { userMustDiscard, removeTemporaryMessages, userMustRelocate })(UserGameInfo)
