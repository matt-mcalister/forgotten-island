import React from "react";
import CurrentTurnInterface from "./CurrentTurnInterface"

class GameInfo extends React.Component {

  render() {
    return (
      <div className="active-game-bottom game-info">
        <div className="team-inventory-container">Team Inventory</div>
        <CurrentTurnInterface />
        <div className="user-inventory-container">Team Inventory</div>
      </div>
    )
  }
}
export default GameInfo
