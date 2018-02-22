import { RestfulAdapter } from "../connections/adapter.js"

export function updateUserNameInput(username) {
  return { type: "UPDATE_USERNAME", userNameInput: username };
}

export function setUser(name) {
  return dispatch => {
    RestfulAdapter.createFetch("users", {user: {name: name}})
    .then(data => { dispatch({ type: "SET_USER", user: data }) } );
  }
}

export function getGames() {
  return (dispatch) => {
    RestfulAdapter.indexFetch("games")
      .then(data => { dispatch({type: "SET_GAMES_LIST", gamesList: data}) } );
  }
}

export function addGameToGamesList(game) {
  return { type: "ADD_GAME_TO_GAMES_LIST", game: game }
}

export function updateNewGameForm(e) {
  let value;
  if (e.target.name === "water_level") {
    value = parseInt(e.target.value)
  } else {
    value = e.target.value
  }
  return { type: "UPDATE_NEW_GAME_FORM", newGameForm: {[e.target.name]: value}}
}

export function createNewGame(newGameForm) {
  RestfulAdapter.createFetchToChannel("games", newGameForm)
  return { type: "RESET_NEW_GAME_FORM", newGameForm: {name: "", water_level: 2} }
}
