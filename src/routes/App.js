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
        console.log(responseData);
        responseData.results.map((pokemon, index) => {
          this.props.dispatch(PokemonActionCreators.addPokemon(pokemon));
        });
        this.setState({
          next: responseData.next
         });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  testingPokemon(targetUrL){
    this.props.dispatch(PokemonActionCreators.addPokemon({name: "testing"}));
  }

  componentDidMount(){
    this.requestPokemons('http://pokeapi.salestock.net/api/v2/pokemon/');
    // this.testingPokemon("testing");
  }

  render(){
    const { dispatch, pokemons } = this.props;
    const addPokemon = bindActionCreators(PokemonActionCreators.addPokemon, dispatch);
    const removePokemon = bindActionCreators(PokemonActionCreators.removePokemon, dispatch);

    return(

      <div>
        <BrowserRouter>
          <div className="main_container">
            <Header />
            <Switch>
              <Route exact path="/" component={ (props) => <Home {...props} pokemons={pokemons} requestPokemons={this.requestPokemons} next={this.state.next}/> }/>
              <Route exact path="/pokemon" component={Pokemons}/>
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
