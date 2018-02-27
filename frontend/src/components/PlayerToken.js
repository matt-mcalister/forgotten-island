import React from "react";
import { HEADERS, API_ROOT } from "../connections/constants"
import { connect } from "react-redux"
import { resetActiveGameState } from "../actions"

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

  componentWillUnmount(){
    this.clearActiveGameUser()
  }

  render() {
    return (
      <div className={`player-token cell-${this.props.position} ${this.props.ability}`}>
        <img className="player-token-image" src={require(`../player-icons/${this.props.ability.toLowerCase()}.png`)}/>
      </div>
    )
  }
}
export default connect(state => ({ currentUser: state.currentUser.currentUser }), { resetActiveGameState })(PlayerToken)
