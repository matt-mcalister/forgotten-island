import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import registerServiceWorker from './registerServiceWorker';
import thunk from "redux-thunk"
import { ActionCableProvider } from 'react-actioncable-provider';
import { BrowserRouter as Router } from 'react-router-dom'

import { API_WS_ROOT } from './connections/constants';
import { gamesReducer, currentUserReducer } from './reducers';

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  games: gamesReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <ActionCableProvider url={API_WS_ROOT}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ActionCableProvider>,
  document.getElementById('root'));
registerServiceWorker();
