import React from "react";

class Tile extends React.Component {

  render() {
    if (this.props.tile.status !== "abyss"){
      const opacity = (this.props.tile.status === "wet") ? 0.4 : 0
      return (
        <div className={`tile cell-${this.props.tile.position}`}>
          <div className="tile-image-container" style={{
            "background": `linear-gradient(rgba(0,0,255,${opacity}), rgba(0,0,254,${opacity})) center center / contain, url(${require(`../tile-imgs/${this.props.tile.name.toLowerCase().replace(/ /g, "_")}.jpg`)}) center center / auto 100%`,
            "backgroundRepeat": "no-repeat, no-repeat"
          }}>
          </div>
          <div className="tile-name">
            <p>{this.props.tile.name}</p>
          </div>
        </div>
      )
    } else {
      return (<div className={`tile abyss cell-${this.props.tile.position}`}></div>)
    }
  }
}
export default Tile

// <img className="tile-image" src={require(`../tile-imgs/${this.props.tile.name.toLowerCase().replace(/ /g, "_")}.jpg`)}/>
// `../tile-imgs/${this.props.tile.name.toLowerCase().replace(/ /g, "_") }.jpg`
