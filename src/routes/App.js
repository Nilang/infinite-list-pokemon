import React from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';

// App pages
import Home from '../pages/Home'

const App = () => (
  <BrowserRouter>
    <div className="container">
      <Route exact path="/" component={ Home } />
    </div>
  </BrowserRouter>
);

export default App;
