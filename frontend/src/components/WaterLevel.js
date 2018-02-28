import React from "react";
import { connect } from "react-redux"

class WaterLevel extends React.Component {

  render() {
    return (
      <div className="water-level-container">
        {this.props.waterLevel && (<div className="water-level" style={{
          "height": `${this.props.waterLevel * 10}%`
        }}/>)}
      </div>
    )
  }
}
export default connect(state => ({waterLevel: state.activeGame.game.water_level }))(WaterLevel)
