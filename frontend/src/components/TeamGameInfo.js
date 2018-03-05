import React from "react";
import { connect } from "react-redux"
import Inventory from "./Inventory"
import TreasureCard from "./TreasureCard"

const TeamGameInfo = (props) => {
  const teamActiveGames = props.active_games.filter(ag => ag.active_game.user.id !== props.currentUser.id)
  const userActiveGame = props.active_games.find(ag => ag.active_game.user.id === props.currentUser.id)
  return (
    <div className="team-game-info">
      <div className="team-inventory-container">
        {teamActiveGames.map(ag => <Inventory key={ag.active_game.id} currentUserActiveGame={userActiveGame.active_game} {...ag.active_game}/>)}
      </div>
      <div className="treasures-obtained">
      {props.treasures_obtained && props.treasures_obtained.map(treasure => <TreasureCard key={treasure} card={treasure}/>)}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    active_games: state.activeGame.active_games,
    currentUser: state.currentUser.currentUser,
    treasures_obtained: state.activeGame.game.treasures_obtained
  }
}
export default connect(mapStateToProps)(TeamGameInfo)
