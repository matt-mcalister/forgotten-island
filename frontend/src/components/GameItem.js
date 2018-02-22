import React from "react"; 
 
class GameItem extends React.Component { 
 
  render() { 
    return ( 
      <div className="game-item">
        <h3>{this.props.game.name}</h3>
        <p>Starting Water Level: {this.props.game.water_level}</p> 
      </div>
    ) 
  } 
} 

export default GameItem