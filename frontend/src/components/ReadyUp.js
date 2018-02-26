import React from "react";
import { connect } from "react-redux"
import ReadyUpButton from "./ReadyUpButton"
import { beginGame } from "../actions"

class ReadyUp extends React.Component {
  beginGameButton = () => {
    if (this.props.active_games.length > 0 && this.props.active_games.every(ag => ag.active_game.ready_to_start)){
      return <div className="begin-game-button" onClick={() => this.props.beginGame(this.props.game)}><h3>Begin Game</h3></div>
    }
  }


  render() {
    return (
      <div className="active-game-bottom ready-up">
        <div className="ready-up-container">
          {!!this.props.active_games.length && this.props.active_games.map(ag => <ReadyUpButton key={ag.active_game.id} active_game={ag.active_game} />)}
        </div>
        {this.beginGameButton()}
      </div>
    )
  }
}
export default connect(state => ({ active_games: state.activeGame.active_games, game: state.activeGame.game}), { beginGame } )(ReadyUp)
