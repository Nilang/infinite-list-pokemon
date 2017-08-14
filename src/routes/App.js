import React, { Component } from 'react';
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
import Type from '../pages/Type';
import Pokemon from '../pages/Pokemon';
import Pokemons from '../pages/Pokemons';
import NotFound from '../pages/NotFound';

// App Component
import Header from '../components/Header';

class App extends Component {

  constructor(){
    super();
    this.state = {
      next: ""
    };
  };

  static propTypes = {
    pokemons: PropTypes.array.isRequired
  };

  requestPokemons = (targetUrl) => {
    fetch(targetUrl)
      .then(response => response.json())
      .then(responseData => {
        this.props.dispatch(PokemonActionCreators.addArrayOfPokemon(responseData.results));
        this.setState({
          next: responseData.next
         });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  refreshPokemons = (typeUrl) => {
    this.props.dispatch(PokemonActionCreators.clearPokemon());
    fetch(typeUrl)
      .then(response => response.json())
      .then(responseData => {
        this.props.dispatch(PokemonActionCreators.addArrayOfPokemonType(responseData.pokemon));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  componentWillMount(){
    this.requestPokemons('http://pokeapi.salestock.net/api/v2/pokemon/');
  }

  render(){
    const { dispatch, pokemons } = this.props;
    const addPokemon = bindActionCreators(PokemonActionCreators.addPokemon, dispatch);
    const removePokemon = bindActionCreators(PokemonActionCreators.removePokemon, dispatch);
    const clearPokemon = bindActionCreators(PokemonActionCreators.clearPokemon, dispatch);

    return(
      <div>
        <BrowserRouter>
          <div className="main_container">
            <Header refreshPokemons={this.refreshPokemons.bind(this)} requestPokemons={this.requestPokemons.bind(this)} clearPokemon={clearPokemon} />
            <Switch>
              <Route exact path="/" component={ (props) => <Home {...props} pokemons={pokemons} requestPokemons={this.requestPokemons.bind(this)} next={this.state.next}/> }/>
              <Route exact path="/pokemon/" component={ (props) => <Pokemons {...props} pokemons={pokemons} requestPokemons={this.requestPokemons.bind(this)} next={this.state.next} postPerReq={3} initialPost={3}/> }/>
              <Route path="/pokemon/:id" component={Pokemon} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
};


const mapStateToProps = state => (
  {
    pokemons: state
  }
);

export default connect(mapStateToProps)(App);
