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
  newGameForm: {name: "", water_level: 2}
}, action) {
  switch(action.type) {
    case 'UPDATE_NEW_GAME_FORM':
      return {
        ...state,
        newGameForm: {...state.newGameForm, ...action.newGameForm}
      }
    case 'RESET_NEW_GAME_FORM':
      return {
        ...state,
        newGameForm: action.newGameForm
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

export function activeGameReducer(state = {
  game: null,
  newMessageInput: "",
  playerReady: false,
  in_session: false,
  messages: [],
  active_games: [],
  water_level: 0
}, action) {
  switch(action.type){
    case 'SET_ACTIVE_GAME':
      
      return {...state, game: action.game, messages: action.game.messages, active_games: action.active_games, water_level: action.game.water_level}
    case 'UPDATE_NEW_MESSAGE_INPUT':
      return {...state, newMessageInput: action.newMessageInput}
    case 'ADD_ACTIVE_GAME_USERS':
      return ({
        ...state,
        active_games: [...state.active_games, action.active_game],
        messages: [...state.messages, {alert: "new_active_game", active_game: action.active_game, id: Date.now() }]
      })
    default:
      return state
  }
}
