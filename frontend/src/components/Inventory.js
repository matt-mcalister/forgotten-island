import React from "react";
import TreasureCard from "./TreasureCard"
import { connect } from "react-redux"
import { selectTreasureToGive } from "../actions"
import { RestfulAdapter } from "../connections/adapter"


class Inventory extends React.Component {

  handleCardClick = (card) => {
    if (this.props.id === this.props.currentUserActiveGame.id && this.props.giveTreasureAction){
      this.props.selectTreasureToGive(card)
    }
  }

  handleInventoryClick = () => {
    if (this.props.id !== this.props.currentUserActiveGame.id && this.props.position === this.props.currentUserActiveGame.position && this.props.treasureToGive){
      const new_actions_remaining = this.props.currentUserActiveGame.actions_remaining - 1
      const body = {gift_treasure: this.props.treasureToGive, gift_to: this.props.id, actions_remaining: this.props.currentUserActiveGame}
      RestfulAdapter.editFetchToChannel("active_games", this.props.currentUserActiveGame.id, body)
    }
  }

  render(){
    return (
      <div className="inventory" onClick={this.handleInventoryClick}>
        <p>{`${this.props.user.name}'s Inventory`}</p>
        <div className="treasure-cards-container">
        {this.props.treasure_cards && this.props.treasure_cards.map((card, index) => <TreasureCard key={`card-${index}`} handleClick={this.handleCardClick} card={card}/>)}
        </div>
      </div>
    )
  }
}

export default connect(state => ({ giveTreasureAction: state.activeGame.giveTreasureAction, treasureToGive: state.activeGame.treasureToGive }), { selectTreasureToGive })(Inventory)
