import React from "react";
import { connect } from "react-redux"
import CurrentTurnInterface from "./CurrentTurnInterface"
import Inventory from "./Inventory"

const GameInfo = (props) => {
  const teamActiveGames = props.active_games.filter(ag => ag.active_game.user.id !== props.currentUser.id)
  const userActiveGame = props.active_games.find(ag => ag.active_game.user.id === props.currentUser.id)
  return (
    <div className="active-game-bottom game-info">
      <div className="team-inventory-container">
        {teamActiveGames.map(ag => <Inventory key={ag.active_game.id} {...ag.active_game}/>)}
      </div>
      {userActiveGame.active_game["is_users_turn?"] && <CurrentTurnInterface active_game={userActiveGame.active_game}/>}
      <div className="user-inventory-container">
        <Inventory key={userActiveGame.active_game.id} {...userActiveGame.active_game}/>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    active_games: state.activeGame.active_games,
    currentUser: state.currentUser.currentUser
  }
}
export default connect(mapStateToProps)(GameInfo)
