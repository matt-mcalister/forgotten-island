import React from "react";
import "../stylesheets/lobby.css"


class GameItem extends React.Component {

  waterLevelDescription = () => {
    switch (this.props.game.water_level) {
      case 1:
        return "Novice";
      case 2:
        return "Normal";
      case 3:
        return "Elite"
      case 4:
        return "Legendary"
      default:
        return "no level set"
    }
  }

  render() {
    return (
      <div className="game-item">
        <h3>{this.props.game.name}</h3>
        <p>Starting Water Level: {this.waterLevelDescription()}</p>
      </div>
    )
  }
}

export default GameItem
