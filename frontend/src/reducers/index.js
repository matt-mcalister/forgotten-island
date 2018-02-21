export default function forgottenReducer(state = {
  currentUser: null,
  activeGame: null,
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
