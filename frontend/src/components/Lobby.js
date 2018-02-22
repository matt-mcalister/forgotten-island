import React from "react"; 
import GamesContainer from "./GamesContainer"
import NewGameForm from "./NewGameForm"
 
class Lobby extends React.Component { 
 
  render() { 
    return ( 
      <div id="lobby">
        <h1>Welcome!</h1>
        <GamesContainer />
        <NewGameForm />
      </div>
    ) 
  } 
} 
export default Lobby