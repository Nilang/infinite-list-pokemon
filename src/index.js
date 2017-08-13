import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import PokemonReducer from './reducers/pokemon';
import App from './routes/App';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const store = createStore(
  PokemonReducer,
  window.devToolsExtension && window.devToolsExtension()
);

ReactDOM.render(
  <App store={store}/>,
  document.getElementById('root')
);
