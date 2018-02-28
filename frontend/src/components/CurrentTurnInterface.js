import React from "react";
import { handleArrowClick } from "../actions/helperFunctions"
import { connect } from "react-redux"
import { toggleShoringAction } from "../actions"

class CurrentTurnInterface extends React.Component {

  render() {
    return (
      <div className="current-turn-interface">

        <div className="navigation-controls">
          <div className="up arrow" onClick={() => handleArrowClick(this.props.active_game, "up", this.props.tiles, this.props.shoringAction)}>
            <img src={require("../navigation-icons/arrow.png")} />
          </div>
          <div className="down arrow" onClick={() => handleArrowClick(this.props.active_game, "down", this.props.tiles, this.props.shoringAction)}>
            <img src={require("../navigation-icons/arrow.png")} />
          </div>
          <div className="left arrow" onClick={() => handleArrowClick(this.props.active_game, "left", this.props.tiles, this.props.shoringAction)}>
            <img src={require("../navigation-icons/arrow.png")} />
          </div>
          <div className="right arrow" onClick={() => handleArrowClick(this.props.active_game, "right", this.props.tiles, this.props.shoringAction)}>
            <img src={require("../navigation-icons/arrow.png")} />
          </div>
          <div className="current-location-pin" onClick={() => handleArrowClick(this.props.active_game, "currentLocation", this.props.tiles, this.props.shoringAction)}>
            <img src={require("../navigation-icons/current_location_pin.png")} />
          </div>
        </div>

        <div className="turn-action-buttons">
          <div className="shore-up-button" onClick={this.props.toggleShoringAction}>
            {(this.props.shoringAction) ? <h3>Cancel Shore</h3> : <h3>Shore Up 1 tile</h3>}
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


export default connect(state => ({ tiles: state.activeGame.tiles, shoringAction: state.activeGame.shoringAction }), { toggleShoringAction })(CurrentTurnInterface)
