import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import PokemonReducer from './reducers/pokemon';
import App from './routes/App';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const store = createStore(
  PokemonReducer
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
