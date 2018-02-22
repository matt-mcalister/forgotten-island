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