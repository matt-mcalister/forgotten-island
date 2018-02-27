import React from "react";
import TreasureCard from "./TreasureCard"


const Inventory = (props) => {
  return (
    <div className="inventory">
      <p>{`${props.user.name}'s Inventory`}</p>
      <div className="treasure-cards-container">
      {props.treasure_cards && props.treasure_cards.map(card => <TreasureCard key={card} card={card}/>)}
      </div>
    </div>
  )
}

export default Inventory
