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
    case "REMOVE_GAME_FROM_GAMES_LIST":
      const filteredGamesList = state.gamesList.filter(game => game.id !== action.game_id)
      return {
        ...state,
        gamesList: filteredGamesList
      }
    default:
      return state
  }
}

export function activeGameReducer(state = {
  game: {water_level: 0},
  newMessageInput: "",
  in_session: false,
  messages: [],
  active_games: [],
  tiles: [],
  shoringAction: false,
  giveTreasureAction: false,
  treasureToGive: null,
  sandbag: false,
  helicopterLift: false,
  playersToLift: []
}, action) {
  switch(action.type){
    case 'SET_ACTIVE_GAME':
      const initMessages = action.messages.map(msg => msg.message)
      const welcomeMessages = action.active_games.map(ag => {return {alert: "new_active_game", active_game: ag.active_game, id: `${ag.active_game.id} - ${Date.now()}` }} )
      return ({
        ...state,
        game: action.game,
        messages: [...initMessages, ...welcomeMessages],
        active_games: action.active_games,
        water_level: action.game.water_level,
        tiles: action.tiles
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
          messages: [...state.messages, {alert: "new_active_game", active_game: action.active_game.active_game, id: `${action.active_game.active_game.id} - ${Date.now()}` }]
        })
      }
    case "REMOVE_ACTIVE_GAME_USERS":
      const filteredActiveGames = state.active_games.filter(ag => ag.active_game.id !== action.active_game.id)
      return {
        ...state,
        active_games: filteredActiveGames,
        messages: [...state.messages, {alert: "removed_active_game", active_game: action.active_game, id: `${action.active_game.active_game.id} - ${Date.now()}` }]
      }
    case "RESET_ACTIVE_GAME_STATE":
      return {
        game: {water_level: 0},
        newMessageInput: "",
        in_session: false,
        messages: [],
        active_games: [],
        tiles: [],
        shoringAction: false,
        treasureToGive: null,
        sandbag: false,
        helicopterLift: false,
        playersToLift: []
      }
    case "ADD_MESSAGE":
      return { ...state, newMessageInput: "", messages: [...state.messages, action.message.message]}
    case "BEGIN_GAME":
      return {
        ...state,
        newMessageInput: "",
        shoringAction: false,
        in_session: true,
        game: action.game.game,
        tiles: action.tiles,
        active_games: action.active_games,
        treasureToGive: null
      }
    case "UPDATE_GAME":
      const messagesIds = state.messages.map(msg => msg.id)
      const onlyNewMessages = action.messages.filter(msg => !messagesIds.includes(msg.id))
      return {
        ...state,
        shoringAction: false,
        newMessageInput: "",
        game: action.game.game,
        tiles: action.tiles,
        active_games: action.active_games,
        giveTreasureAction: false,
        treasureToGive: null,
        messages: [...state.messages, ...onlyNewMessages],
        sandbag: false,
        helicopterLift: false,
        playersToLift: []
      }
    case "TOGGLE_SHORING_ACTION":
      let newShoringAction = !state.shoringAction
      return {
        ...state,
        shoringAction: newShoringAction
      }
    case "TOGGLE_SANDBAG":
      let newSandbag = !state.sandbag
      return {
        ...state,
        sandbag: newSandbag,
        helicopterLift: false
      }
    case "TOGGLE_HELICOPTER_LIFT":
      let newHelicopterLift = !state.helicopterLift
      let newPlayersToLift = state.playersToLift
      if (!newHelicopterLift){
        newPlayersToLift = []
      }
      return {
        ...state,
        helicopterLift: newHelicopterLift,
        playersToLift: newPlayersToLift,
        sandbag: false
      }
    case "ADD_TO_PLAYERS_TO_LIFT":
      return {
        ...state,
        playersToLift: [...state.playersToLift, action.active_game]
      }
    case "TOGGLE_GIVE_TREASURE_ACTION":
      let newGiveTreasureAction = !state.giveTreasureAction
      let newMessages;
      if (newGiveTreasureAction){
        newMessages =  [...state.messages, {alert: "select_treasure_to_give", id: Date.now() }]
      } else {
        newMessages = state.messages
      }
      return {
        ...state,
        messages: newMessages,
        giveTreasureAction: newGiveTreasureAction,
        treasureToGive: null
      }
    case "SELECT_TREASURE_TO_GIVE":
      return {
        ...state,
        treasureToGive: action.treasure,
        messages: [...state.messages, {alert: "select_active_game_to_give_to", treasure: action.treasure, id: Date.now() }]
      }
    case "HANDLE_SHORED_TILE":
      let updatedTiles = state.tiles.map(tile => {
        if (tile.tile.id === action.shored_tile.tile.id){
          return action.shored_tile
        } else {
          return tile
        }
      })
      let updatedActiveGames = state.active_games.map(ag => {
        if (ag.active_game.id === action.updated_active_game.active_game.id){
          return action.updated_active_game
        } else {
          return ag
        }
      })
      return {
        ...state,
        shoringAction: false,
        tiles: updatedTiles,
        active_Games: updatedActiveGames
      }
    default:
      return state
  }
}
