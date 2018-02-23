import React from "react";

class Tile extends React.Component {

  render() {
    return (
      <div className={`tile cell-${this.props.tile.position}`}>
        <div className="tile-image-container">
          <img className="tile-image" src={require(`../tile-imgs/${this.props.tile.name.toLowerCase().replace(/ /g, "_")}.jpg`)}/>
        </div>
        <div className="tile-name">
          <p>{this.props.tile.name}</p>
        </div>
      </div>
    )
  }
}
export default Tile
