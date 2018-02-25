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
    value = parseInt(e.target.value, 10)
  } else {
    value = e.target.value
  }
  return { type: "UPDATE_NEW_GAME_FORM", newGameForm: {[e.target.name]: value}}
}

export function createNewGame(newGameForm) {
  RestfulAdapter.createFetchToChannel("games", newGameForm)
  return { type: "RESET_NEW_GAME_FORM", newGameForm: {name: "", water_level: 2} }
}

export function setActiveGame(game, user_id){
  return async (dispatch) => {
    await RestfulAdapter.createFetchToChannel("active_games", {user_id: user_id, game_id: game.id})
    RestfulAdapter.showFetch("games", game.id)
      .then(data => dispatch({ type: "SET_ACTIVE_GAME", game: data.game.game, active_games: data.active_games }))
  }
}

export function updateNewMessageInput(newMessageInput){
  return { type: "UPDATE_NEW_MESSAGE_INPUT", newMessageInput: newMessageInput }
}

export function addActiveGameUsers(active_game){
  return { type: "ADD_ACTIVE_GAME_USERS", active_game: active_game}
}

export function toggleReadyUp(active_game){
  RestfulAdapter.editFetchToChannel("active_games", active_game.id, {active_game: {ready_to_start: !active_game.ready_to_start }})
  return { type: "TOGGLE_READY_UP" }
}

export function removeActiveGameUsers(active_game_id){
  return { type: "REMOVE_ACTIVE_GAME_USERS", active_game_id: active_game_id }
}

export function resetActiveGameState(){
  return { type: "RESET_ACTIVE_GAME_STATE" }
}
