import React from "react";
import { HEADERS, API_ROOT } from "../connections/constants"
import { connect } from "react-redux"

class PlayerToken extends React.Component {
  componentDidMount = () => {
    window.addEventListener("beforeunload", this.clearActiveGameUser)
  }

  clearActiveGameUser = () => {
    if (this.props.currentUser.id === this.props.id) {
      fetch(`${API_ROOT}/active_games/${this.props.id}`, {
        method: "DELETE",
        headers: HEADERS(),
      })
    }
  }

  render() {
    console.log(this.props)
    return (
      <div className={`player-token cell-${this.props.position}`}>
        <img className="player-token-image" src={require(`../player-icons/${this.props.ability.toLowerCase()}.png`)}/>
      </div>
    )
  }
}
export default connect(state => ({ currentUser: state.currentUser.currentUser }))(PlayerToken)
