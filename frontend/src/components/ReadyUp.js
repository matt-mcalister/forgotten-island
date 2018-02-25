import React from "react";
import { connect } from "react-redux"
import ReadyUpButton from "./ReadyUpButton"

class ReadyUp extends React.Component {

  render() {
    return (
      <div className="active-game-bottom ready-up">
        <div className="ready-up-container">
          {!!this.props.active_games.length && this.props.active_games.map(ag => <ReadyUpButton key={ag.active_game.id} active_game={ag.active_game} />)}
        </div>
      </div>
    )
  }
}
export default connect(state => ({ active_games: state.activeGame.active_games}))(ReadyUp)
