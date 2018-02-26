import React from "react";
import TreasureCard from "./TreasureCard"


const Inventory = (props) => {
  return (
    <div className="inventory">
      <p>{`${props.user.name}'s Inventory`}</p>
      {props.inventory && props.inventory.map(card => <TreasureCard key={card} card={card}/>)}
    </div>
  )
}

export default Inventory
