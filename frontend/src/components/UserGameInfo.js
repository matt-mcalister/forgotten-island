import React from "react";
import { connect } from "react-redux"
import CurrentTurnInterface from "./CurrentTurnInterface"
import Inventory from "./Inventory"

const UserGameInfo = (props) => {
  const teamActiveGames = props.active_games.filter(ag => ag.active_game.user.id !== props.currentUser.id)
  const userActiveGame = props.active_games.find(ag => ag.active_game.user.id === props.currentUser.id)
  return (
    <div className="active-game-bottom game-info">
      {!props.halt_game_for_discard && userActiveGame.active_game["is_users_turn?"] && <CurrentTurnInterface active_game={userActiveGame.active_game}/>}
      <div className="user-inventory-container">
        <Inventory key={userActiveGame.active_game.id} currentUserActiveGame={userActiveGame.active_game} {...userActiveGame.active_game}/>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    active_games: state.activeGame.active_games,
    currentUser: state.currentUser.currentUser,
    halt_game_for_discard: state.activeGame.game["halt_game_for_discard?"]
  }
}
export default connect(mapStateToProps)(UserGameInfo)
