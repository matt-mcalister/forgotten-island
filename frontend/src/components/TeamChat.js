import React from "react";
import { connect } from "react-redux"
import Message from "./Message"
import { updateNewMessageInput } from "../actions"

class TeamChat extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault()
  }

  handleChange = (e) => {
    this.props.updateNewMessageInput(e.target.value)
  }

  render() {
    console.log("messageInput: ", this.props.newMessageInput)
    return (
      <div className="team-chat">
        <div className="messages-container">
        {this.props.messages.map(msg => <Message key={msg.id} message={msg}/>)}
        </div>
        <form className="new-message-form" onSubmit={this.handleSubmit}>
          <input type="text" value={this.props.newMessageInput} onChange={this.handleChange} placeholder="Type here to chat" />
          <input className="submit" type="submit" value="Send" />
        </form>
      </div>
    )
  }
}
export default connect(state => ({messages: state.activeGame.game.messages, currentUser: state.currentUser.currentUser, newMessageInput: state.activeGame.newMessageInput }), { updateNewMessageInput })(TeamChat)
