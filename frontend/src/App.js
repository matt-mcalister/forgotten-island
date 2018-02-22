import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Welcome from "./components/Welcome";
import Lobby from "./components/Lobby";
import ActiveGame from "./components/ActiveGame";
import { connect } from "react-redux";



class App extends Component {

  render() {
    return(
    <div>
      <Switch>
        <Route path="/games/:id" render={props => <ActiveGame />}/>
        <Route path="/login" render={props => <Welcome routerProps={props} />}/>
        <Route exact path="/" render={props => <Lobby />}/>
      </Switch>
    </div>)
  }
}

export default App;
