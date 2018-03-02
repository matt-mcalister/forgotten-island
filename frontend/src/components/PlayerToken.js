import React from "react";
import { HEADERS, API_ROOT } from "../connections/constants"
import { connect } from "react-redux"
import { resetActiveGameState, addToPlayersToLift } from "../actions"

class PlayerToken extends React.Component {
  componentDidMount = () => {
    window.addEventListener("beforeunload", this.clearActiveGameUser)
  }

  clearActiveGameUser = () => {
    if (this.props.currentUser.id === this.props.user.id) {
      fetch(`${API_ROOT}/active_games/${this.props.id}`, {
        method: "DELETE",
        headers: HEADERS(),
      })
      this.props.resetActiveGameState()
    }
  }

  handleClick = (e) => {
    console.log("playertoken clickable")
    if (this.props.helicopterLift && (this.props.helicopterStartingPosition === 0 || this.props.helicopterStartingPosition === this.props.position)) {
      console.log("should be adding players to lift")
      this.props.addToPlayersToLift({id: this.props.id, position: this.props.position})
    }
  }

  componentWillUnmount(){
    this.clearActiveGameUser()
  }

  render() {
    return (
      <div className={`player-token cell-${this.props.position} ${this.props.ability}`} onClick={this.handleClick}>
        <img className="player-token-image" src={require(`../player-icons/${this.props.ability.toLowerCase()}.png`)}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  let helicopterStartingPosition = 0
  if (state.activeGame.playersToLift[0]){
    helicopterStartingPosition = state.activeGame.playersToLift[0].position
  }
  return {
    currentUser: state.currentUser.currentUser,
    helicopterLift: state.activeGame.helicopterLift,
    helicopterStartingPosition: helicopterStartingPosition }
}
export default connect(mapStateToProps, { resetActiveGameState, addToPlayersToLift })(PlayerToken)
