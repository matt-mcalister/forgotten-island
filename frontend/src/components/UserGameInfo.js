import React from "react";
import { connect } from "react-redux"
import CurrentTurnInterface from "./CurrentTurnInterface"
import Inventory from "./Inventory"
import { userMustDiscard, removeTemporaryMessages } from "../actions"

class UserGameInfo extends React.Component {
  componentDidUpdate(){
    if (this.props.currentUserActiveGame["must_discard?"]) {
      this.props.userMustDiscard()
    } else if (this.props.giveTreasureAction){
      null
    } else {
      this.props.removeTemporaryMessages()
    }
  }

  render(){
    return (
      <div className="active-game-bottom game-info">
        {!this.props.halt_game_for_discard && this.props.currentUserActiveGame["is_users_turn?"] && <CurrentTurnInterface active_game={this.props.currentUserActiveGame}/>}
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
    halt_game_for_discard: state.activeGame.game["halt_game_for_discard?"]
  }
}
export default connect(mapStateToProps, { userMustDiscard, removeTemporaryMessages })(UserGameInfo)
