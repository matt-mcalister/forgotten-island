import React from "react";
import { connect } from "react-redux"

const Message = (props) => {
  if (props.message.alert){
    switch (props.message.alert){
      case "new_active_game":
        if (props.message.active_game.user.id === props.currentUser.id){
          return (
            <div className="alert">
            <p>{`Welcome to Forbidden Island, ${props.message.active_game.user.name}! You are the ${props.message.active_game.ability}.`}</p>
            </div>)
        } else {
          return (
            <div className="alert">
            <p>{`${props.message.active_game.user.name} the ${props.message.active_game.ability} has joined your cause!`}</p>
            </div>)
        }
      case "removed_active_game":
        return (
              <div className="alert">
                <p>{`${props.message.active_game.user.name} has exited the Island.`}</p>
              </div>)
      case "select_treasure_to_give":
        return (
          <div className="alert">
            <p>CLICK ON AN ITEM IN YOUR INVENTORY TO GIVE:</p>
          </div>
        )
      case "select_active_game_to_give_to":
        return (
          <div className="alert">
            <p>CLICK ON A FELLOW ADVENTURERs INVENTORY TO GIVE THEM YOUR {props.message.treasure.replace(/THE /, "").toUpperCase()} TOKEN </p>
            <p>NOTE: ADVENTURER MUST BE ON THE SAME TILE</p>
          </div>
        )
      case "user_must_discard":
        return (
          <div className="alert">
            <p>Select a card to discard before continuing</p>
          </div>
        )
      default:
        return (
          <div className="alert">
            <p>{props.message.text}</p>
          </div>)
    }
  } else {
    if (props.message.user.id === props.currentUser.id) {
      return (
        <div className="message current-user-msg">
          <p><b>{`${props.message.user.name}`}</b>{`: ${props.message.text}`}</p>
        </div>
      )
    } else {
      return (
        <div className="message team-msg">
          <p><b>{`${props.message.user.name}`}</b>{`: ${props.message.text}`}</p>
        </div>
      )
    }
  }
}
export default connect(state => ({currentUser: state.currentUser.currentUser}))(Message)
