import React from "react";
import { connect } from "react-redux"
import { RestfulAdapter } from "../connections/adapter"

class Tile extends React.Component {

  handleClick = (e) => {
    if (this.props.sandbag && this.props.tile.status === "wet"){
      let sandbagBody = { actions_remaining: this.props.currentUserActiveGame.actions_remaining, sandbag: this.props.tile.id }
      RestfulAdapter.editFetchToChannel("active_games", this.props.currentUserActiveGame.id, sandbagBody )
    }
  }

  render() {
    let formattedTreasure;
    if (this.props.tile.treasure){
      formattedTreasure = this.props.tile.treasure.toLowerCase().replace(/ /g, "-")
    }
    if (this.props.tile.status !== "abyss"){
      const opacity = (this.props.tile.status === "wet") ? 0.4 : 0
      return (
        <div className={`tile cell-${this.props.tile.position}`} onClick={this.handleClick}>
          <div className="tile-image-container" style={{
            "background": `linear-gradient(rgba(0,0,255,${opacity}), rgba(0,0,254,${opacity})) center center / contain, url(${require(`../tile-imgs/${this.props.tile.name.toLowerCase().replace(/ /g, "_")}.jpg`)}) center center / auto 100%`,
            "backgroundRepeat": "no-repeat, no-repeat"
          }}>
          </div>
          <div className="tile-name">
            {this.props.tile.treasure && <div className="treasure-icon"><img className="treasure-icon-img" src={require(`../treasure-card-icons/${formattedTreasure}.png`)}/></div>}
            <p>{this.props.tile.name}</p>
          </div>
        </div>
      )
    } else {
      return (<div className={`tile abyss cell-${this.props.tile.position}`}></div>)
    }
  }
}

const mapStateToProps = state => {
  const currentUserActiveGame = state.activeGame.active_games.find(ag => ag.active_game.user.id === state.currentUser.currentUser.id).active_game
  return {
    sandbag: state.activeGame.sandbag,
    currentUserActiveGame: currentUserActiveGame
  }
}
export default connect(mapStateToProps)(Tile)

// <img className="tile-image" src={require(`../tile-imgs/${this.props.tile.name.toLowerCase().replace(/ /g, "_")}.jpg`)}/>
// `../tile-imgs/${this.props.tile.name.toLowerCase().replace(/ /g, "_") }.jpg`
