export function currentUserReducer(state = {
  currentUser: null,
  userNameInput: ""
}, action) {
  switch(action.type) {

    case 'UPDATE_USERNAME':
      return {...state, userNameInput: action.userNameInput};
    case "SET_USER":
      return { ...state, currentUser: action.user}
    default:
      return state;
  }
}

export function gamesReducer(state = {
  gamesList: [],
  newGameForm: {name: "", waterLevel: 2}
}, action) {
  switch(action.type) {
    case 'UPDATE_FORM':
      return {
        ...state,
        newGameForm: {...state.newGameForm, ...action.newGameForm}
      }
    case "SET_GAMES_LIST":
      return {
        ...state,
        gamesList: action.gamesList
      }
    case "ADD_GAME_TO_GAMES_LIST":
      return {
        ...state,
        gamesList: [...state.gamesList, action.game.game]
      }
    default:
      return state
  }
}
