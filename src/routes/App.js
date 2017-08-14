// Library
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
import Pokemon from '../pages/Pokemon';
import Pokemons from '../pages/Pokemons';
import NotFound from '../pages/NotFound';

// App Component
import Header from '../components/Header';

// App is the main root of pokedex application which control the routing to pages.
class App extends Component {

  // App variables
  next;

  // App props
  static propTypes = {
    pokemons: PropTypes.array.isRequired
  };

  // Constructor App
  constructor(){
    super();
    this.state = {
      done: true
    };
  };

  // App component implemetation
  componentWillMount(){
    this.requestAllPokemonUrl('http://pokeapi.salestock.net/api/v2/pokemon/');
  }

  // App functions

  requestAllPokemonUrl = (targetUrl) =>{
    this.setState({done:false});
    fetch(targetUrl)
      .then(response => response.json())
      .then(responseData => {
        this.props.dispatch(PokemonActionCreators.addArrayOfPokemon(responseData.results));
        this.next = responseData.next;
        this.requestNextPokemonUrl();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  requestNextPokemonUrl = () => {
    if(this.next !== null){
      this.requestAllPokemonUrl(this.next);
    }else{
      this.setState({done:true});
    }
  };

  refreshPokemons = (typeUrl) => {
    this.props.dispatch(PokemonActionCreators.clearPokemon());
    fetch(typeUrl)
      .then(response => response.json())
      .then(responseData => {
        this.props.dispatch(PokemonActionCreators.addArrayOfPokemonType(responseData.pokemon));
        this.next = null;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // App render
  render(){
    // const for use of redux actioncreators on component.
    const { dispatch, pokemons } = this.props;
    const clearPokemon = bindActionCreators(PokemonActionCreators.clearPokemon, dispatch);

    if(this.state.done){

      return(
        <div>
          <BrowserRouter>
            <div className="main_container">
              <Header refreshPokemons={this.refreshPokemons.bind(this)} requestAllPokemonUrl={this.requestAllPokemonUrl.bind(this)} clearPokemon={clearPokemon} />
              <Switch>
                <Route exact path="/" component={ (props) => <Pokemons {...props} pokemons={pokemons} postPerReq={3} initialPost={3}/> }/>
                <Route path="/pokemon/:id" component={Pokemon} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </BrowserRouter>
        </div>
      );

    }else{

      return(
        <div>Loading...</div>
      );

    }

  }
};


const mapStateToProps = state => (
  {
    pokemons: state
  }
);

export default connect(mapStateToProps)(App);
