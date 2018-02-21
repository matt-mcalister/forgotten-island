import React from "react"; 
import { connect } from "react-redux";
import { updateUserNameInput, setUser } from '../actions'
 
class Welcome extends React.Component {
 

  
  handleChange = (e) => {
    this.props.updateUserNameInput(e.target.value)
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.setUser(this.props.userNameInput)
  }
 
  render() { 
    console.log(this.props.userNameInput)
    return ( 
      <div>
        <h1>Forgotten Island</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.props.userNameInput} onChange={this.handleChange} placeholder="Enter your name here..." />
          <input type="submit" hidden/>
        </form>
      </div>
    ) 
  } 
} 

export default connect(state =>  ({userNameInput: state.userNameInput}), { updateUserNameInput, setUser })(Welcome);