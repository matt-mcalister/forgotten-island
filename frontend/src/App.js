import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Welcome from "./components/Welcome";
import Lobby from "./components/Lobby";
import { connect } from "react-redux";


class App extends Component {
  
  renderHomePage = () => {
    if (this.props.currentUser){
      return <Lobby />
    } else {
      return <Welcome />
    }
  }
  
  render() {
    console.log(this.props)
    return (
      <div>
        <Route exact path="/" render={props => this.renderHomePage()}/>
      </div>
    );
  }
}

export default connect(state => ({ currentUser: state.currentUser.currentUser }), null)(App);
