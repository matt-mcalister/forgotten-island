import React from "react";
import { connect } from "react-redux"

const ReadyUpButton = (props) => {
  console.log(props)
  switch (props.active_game.user.id) {
    case props.currentUser.id:
      const user_color = (props.active_game.ready_to_start) ? "green" : "red"
      const user_message = (props.active_game.ready_to_start) ? "Ready!" : "Not ready"
      return (
        <div className="ready-up-button" onClick={console.log} style={{
          "backgroundColor": user_color
        }}>
        {user_message}
        </div>
      );
    default:
      const color = (props.active_game.ready_to_start) ? "green" : "red"
      const message = (props.active_game.ready_to_start) ? "Ready!" : "Not ready"
      return (
        <div className="ready-up-button" style={{
          "backgrounColor": color
        }}>
        {message}
        </div>
      );
  }
}
export default connect(state => ({currentUser: state.currentUser.currentUser}))(ReadyUpButton)
