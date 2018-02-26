import React from "react";

// one type for treasure card
// one type for shore up and helicopter
// one type for water's rise
const TreasureCard = (props) => {
  switch (props.card){
    case "Waters Rise":
      return (
        <div className="treasure-card waters-rise">
          <h3>Waters Rise</h3>
        </div>)
    case "Sandbag":
      return (
        <div className="treasure-card sandbag">
          <h3>Sandbag</h3>
        </div>)
    case "Helicopter Lift":
      return (
        <div className="treasure-card helicopter-lift">
          <h3>Helicopter Lift</h3>
        </div>)
    default:
      const formattedInventoryItem = props.card.toLowerCase().replace(/ /g, "-")
      return (
        <div className={`treasure-card ${formattedInventoryItem}`}>
          <img src={require(`../treasure-card-icons/${formattedInventoryItem}.png`)}/>
        </div>
      )
  }
}

export default TreasureCard
