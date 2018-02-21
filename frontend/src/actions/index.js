import { RestfulAdapter } from "../connections/adapter.js"

export function updateUserNameInput(username) {
  return { type: "UPDATE_USERNAME", userNameInput: username };
}

export function setUser(name) {
  return dispatch => {
    RestfulAdapter.createFetch("users", {user: {name: name}})
    .then(data => { dispatch({ type: "SET_USER", user: data });} );
  }
}