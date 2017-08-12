import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

// App pages
import Home from '../pages/Home';
import Pokemon from '../pages/Pokemon';
import NotFound from '../pages/NotFound';

export default class App extends Component {
  render(){
    return(
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/pokemon" component={Home}/>
            <Route path="/pokemon/:id" component={Pokemon} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
};
