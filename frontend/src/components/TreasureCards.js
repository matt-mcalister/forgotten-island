import React from "react";
import { connect } from "react-redux"


class TreasureCards extends React.Component {


  render() {
    return (
      <div className="cards-container">
        {!!this.props.treasure_cards.length && <div className="treasure-cards card"><h3>Treasure Cards</h3></div>}
        {!!this.props.treasure_discards && <div className="treasure-discards card"><h3>{this.props.treasure_discards[0]}</h3></div>}
      </div>
    )
  }
}

export default connect(state => ({treasure_cards: state.activeGame.game.treasure_cards, treasure_discards: state.activeGame.game.treasure_discards }))(TreasureCards)
