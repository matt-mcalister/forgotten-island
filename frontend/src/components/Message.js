import React from "react";
import { connect } from "react-redux"

const Message = (props) => {
  if (props.message.alert){
    switch (props.message.alert){
      case "new_active_game":
        if (props.message.active_game.user.id === props.currentUser.id){
          return (
            <div className="alert">
            {`Welcome to Forbidden Island! You are the ${props.message.active_game.ability}.`}
            </div>)
        } else {
          return (
            <div className="alert">
            {`The ${props.message.active_game.ability} has joined your cause!`}
            </div>)
        }
      default:
        return (<div>BIG OLD MESSAGE</div>)
    }
  } else {
    return (
      <div className="message">
        {props.message.text}
      </div>
    )
  }
}
export default connect(state => ({currentUser: state.currentUser.currentUser}))(Message)
