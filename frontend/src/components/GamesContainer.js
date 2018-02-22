import React from "react"; 
import { connect } from "react-redux";
import { getGames, addGameToGamesList } from "../actions"
import GameItem from "./GameItem"
import { ActionCable } from 'react-actioncable-provider';


class GamesContainer extends React.Component { 

  componentDidMount(){
    this.props.getGames()
  }
  
  handleReceivedGame = (game) => {
    this.props.addGameToGamesList(game)
  }
 
  render() {
    console.log(this.props.gamesList)
    return ( 
      <div>
        <ActionCable
           channel={{ channel: 'GamesChannel' }}
           onReceived={this.handleReceivedGame}
           />
        {this.props.gamesList.map(game => <GameItem key={game.id} game={game} />)}
      </div>
    ) 
  } 
} 
export default connect(state => ({ gamesList: state.games.gamesList }), { getGames, addGameToGamesList })(GamesContainer)