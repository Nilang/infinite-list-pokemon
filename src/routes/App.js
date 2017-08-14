// Library
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PokemonActionCreators from '../actions/pokemon';
import PropTypes from 'prop-types';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

// App pages
import Home from '../pages/Home';
import Pokemon from '../pages/Pokemon';
import AllPokemon from '../pages/AllPokemon';
import NotFound from '../pages/NotFound';

// App Component
import Header from '../components/Header';
import LoadingPage from '../components/LoadingPage';

// App is the main root of pokedex application which control the routing to pages.
class App extends Component {

  // App variables
  static next;          // Variable use to store the next url to fetch data
  static totalReqUrl;   // Variable use to store total pokemon data will be fetched. Use to calculate progress bar

  // App props
  static propTypes = {
    pokemons: PropTypes.array.isRequired    // Props used to store pokemon url data. Can be changed by redux.
  };

  // Constructor App
  constructor(){
    super();
    this.state = {
      done: true,   // State of fetched url data. false: url data still being fetch. true: all url data fetched.
      progress: 0   // State of progress bar from value 0-100
    };
  };

  // App functions
  // Fetch data from server for 20 url per request over and over till done.
  requestAllPokemonUrl = (targetUrl) =>{
    this.setState({done:false});    // set state to false when request started.
    fetch(targetUrl)
      .then(response => response.json())
      .then(responseData => {
        this.props.dispatch(PokemonActionCreators.addArrayOfPokemon(responseData.results));   // Add first fetched url data to pokemon store on redux.
        this.calculateProgress(responseData.count);                                           // Calculate the progress
        this.next = responseData.next;                                                        // Prepare the next url to fetch
        this.requestNextPokemonUrl();                                                         // Refetched the next url
      })
      .catch((error) => {
        console.error(error);
      });
  }
  // Function call to refetch data. Part of requestAllPokemonUrl function.
  requestNextPokemonUrl = () => {
    if(this.next !== null){                       // if next url still exist still fetched the data
      this.requestAllPokemonUrl(this.next);
    }else{                                        // the break of fetched data when next url doesnt exist
      this.setState({done:true});
    }
  };
  // Fetch data from server one time. use for list of pokemon.
  requestPokemonUrl = (targetUrl) => {
    let url;
    if (targetUrl === null || targetUrl === undefined){
      url = this.next;
    }else{
      url = targetUrl;
    }
    fetch(url)
      .then(response => response.json())
      .then(responseData => {
        this.props.dispatch(PokemonActionCreators.addArrayOfPokemon(responseData.results));   // Add first fetched url data to pokemon store on redux.
        this.next = responseData.next;                                                        // Prepare the next url to fetch
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // Fetch data from server with specific type of pokemon. all url fetched in one request.
  requestPokemonUrlByType = (typeUrl) => {
    fetch(typeUrl)
      .then(response => response.json())
      .then(responseData => {
        this.props.dispatch(PokemonActionCreators.newArrayOfPokemonType(responseData.pokemon));   // All url data stored to pokemon on redux
        this.next = null;
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // Function to calculate progress bar for rendering for first time.
  calculateProgress = (count) => {
    if (this.next === undefined || this.next === null){
      this.totalReqUrl = count;
    }else{
      let hold = this.next.replace('https://pokeapi.salestock.net/api/v2/pokemon/?offset=','');
      let percent = (hold/count) * 100;
      if (this.refs.progress) {
        this.setState({
          progress: percent
        });
      }
    }
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

              <Header requestPokemonUrlByType={this.requestPokemonUrlByType.bind(this)} requestAllPokemonUrl={this.requestAllPokemonUrl.bind(this)} clearPokemon={clearPokemon} />

              <Switch>

                <Route exact path="/" component={ (props) => <Home {...props} pokemons={pokemons} requestPokemonUrl={this.requestPokemonUrl.bind(this)}/> }/>
                <Route exact path="/allpokemon/" component={ (props) => <AllPokemon {...props} pokemons={pokemons} requestAllPokemonUrl={this.requestAllPokemonUrl.bind(this)} postPerReq={3} initialPost={3}/> }/>
                <Route exact path="/pokemon" component={ () => <Redirect to="/"/> } />
                <Route path="/pokemon/:id" component={Pokemon} />
                <Route path="/loading/" component={LoadingPage} />
                <Route component={NotFound} />

              </Switch>
            </div>
          </BrowserRouter>

        </div>
      );
    }
    // LOADING SCREEN when page above not ready yet.
    return(
      <div className="main_container" ref="progress">
        <LoadingPage progress={this.state.progress}/>
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
