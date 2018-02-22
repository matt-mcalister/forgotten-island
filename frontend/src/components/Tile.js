import React from "react";

class Tile extends React.Component {

  render() {
    return (
      <div className="tile">
        {this.props.tile.name}
      </div>
    )
  }
}
export default Tile
