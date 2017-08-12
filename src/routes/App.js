import React from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';

// App pages
import Home from '../pages/Home';
import Pokemon from '../pages/Pokemon';

const App = () => (
  <BrowserRouter>
    <div className="container">
      <Route exact path="/" render={ () => <Home /> } />
      <Route path="/pokemon" render={ () => <Pokemon /> } />
    </div>
  </BrowserRouter>
);

export default App;
