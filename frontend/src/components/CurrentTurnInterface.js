import React from "react";
import { canMove } from "../actions/helperFunctions"

class CurrentTurnInterface extends React.Component {

  render() {
    return (
      <div className="current-turn-interface">

        <div className="navigation-controls">
          <div className="up arrow" onClick={() => canMove(this.props.active_game, "up")}>
            <img src={require("../navigation-icons/arrow.png")} />
          </div>
          <div className="down arrow" onClick={() => canMove(this.props.active_game, "down")}>
            <img src={require("../navigation-icons/arrow.png")} />
          </div>
          <div className="left arrow" onClick={() => canMove(this.props.active_game, "left")}>
            <img src={require("../navigation-icons/arrow.png")} />
          </div>
          <div className="right arrow" onClick={() => canMove(this.props.active_game, "right")}>
            <img src={require("../navigation-icons/arrow.png")} />
          </div>
          <div className="current-location-pin">
            <img src={require("../navigation-icons/current_location_pin.png")} />
          </div>
        </div>

        <div className="turn-action-buttons">
          <div className="shore-up-button">
            <h3>Shore Up 1 tile</h3>
          </div>
          <div className="give-treasure-button">
            <h3>Give 1 Treasure Token To Another Player</h3>
          </div>
          <div className="cash-in-button">
            <h3>Trade 4 Treasure Tokens for 1 Treasure</h3>
          </div>
        </div>

      </div>
    )
  }
}
export default CurrentTurnInterface
