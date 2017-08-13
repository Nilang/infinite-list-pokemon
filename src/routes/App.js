import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PokemonActionCreators from '../actions/pokemon';
import PropTypes from 'prop-types';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

// App pages
import Home from '../pages/Home';
import Pokemon from '../pages/Pokemon';
import Pokemons from '../pages/Pokemons';
import NotFound from '../pages/NotFound';

// App Component
import Header from '../components/Header';

class App extends Component {

  static propTypes = {
    pokemons: PropTypes.array.isRequired
  };

  render(){
    const { dispatch, pokemons } = this.props;
    const addPokemon = bindActionCreators(PokemonActionCreators.addPokemon, dispatch);
    const removePokemon = bindActionCreators(PokemonActionCreators.removePokemon, dispatch);

    return(

      <Provider store={this.props.store}>
        <BrowserRouter>
          <div className="main_container">
            <Header />
            <Switch>
              <Route exact path="/" component={ (props) => <Home {...props} pokemons={pokemons} addPokemon={addPokemon}/> }/>
              <Route exact path="/pokemon" component={Pokemons}/>
              <Route path="/pokemon/:id" component={Pokemon} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
};


const mapStateToProps = state => (
  {
    pokemons: state
  }
);

export default connect(mapStateToProps)(App);
