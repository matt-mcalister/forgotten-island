import React from "react";
import { connect } from "react-redux"


class FloodCards extends React.Component {


  render() {
    return (
      <div className="cards-container">
        {!!this.props.flood_cards.length && <div className="flood-cards card"><h3>Flood Cards</h3></div>}
        {!!this.props.flood_discards && <div className="flood-discards card"><h3>{this.props.flood_discards[0]}</h3></div>}
      </div>
    )
  }
}

export default connect(state => ({flood_cards: state.activeGame.game.flood_cards, flood_discards: state.activeGame.game.flood_discards }))(FloodCards)
