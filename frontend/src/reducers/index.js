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
  in_session: false,
  messages: [],
  active_games: [],
  water_level: 0
}, action) {
  switch(action.type){
    case 'SET_ACTIVE_GAME':
      const initMessages = action.messages.map(msg => msg.message)
      const welcomeMessages = action.active_games.map(ag => {return {alert: "new_active_game", active_game: ag.active_game, id: Date.now() }} )
      return ({
        ...state,
        game: action.game,
        messages: [...initMessages, ...welcomeMessages],
        active_games: action.active_games,
        water_level: action.game.water_level
      })
    case 'UPDATE_NEW_MESSAGE_INPUT':
      return {...state, newMessageInput: action.newMessageInput}
    case 'ADD_ACTIVE_GAME_USERS':
      if (state.active_games.find(ag => ag.active_game.id === action.active_game.active_game.id)){
        const newActiveGames = state.active_games.map(ag => {
          if (ag.active_game.id === action.active_game.active_game.id){
            return action.active_game
          }
          return ag
        })
        return ({
          ...state,
          active_games: newActiveGames
        })
      } else {
        return ({
          ...state,
          active_games: [...state.active_games, action.active_game],
          messages: [...state.messages, {alert: "new_active_game", active_game: action.active_game.active_game, id: Date.now() }]
        })
      }
    case "REMOVE_ACTIVE_GAME_USERS":
      const filteredActiveGames = state.active_games.filter(ag => ag.active_game.id !== action.active_game.id)
      return {
        ...state,
        active_games: filteredActiveGames,
        messages: [...state.messages, {alert: "removed_active_game", active_game: action.active_game, id: Date.now() }]
      }
    case "RESET_ACTIVE_GAME_STATE":
      return {
        game: null,
        newMessageInput: "",
        in_session: false,
        messages: [],
        active_games: [],
        water_level: 0
      }
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.message.message]}
    default:
      return state
  }
}
