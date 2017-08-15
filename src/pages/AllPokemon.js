import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button
 } from 'react-bootstrap';

// App Component
import Pokemon from './Pokemon';

// AllPokemon is component that have infinite list of pokemon's profile. It's have responsibility to call all pokemon's url and pass the url to be used by Pokemon component. This component have responsibility to call Pokemon profile corresponding on number of profile per request.
export default class AllPokemon extends Component {

  static nextPost;    // Store the index
  static postSize;    // Store total post at given time

  // App constructor
  constructor(){
    super();
    this.state={
      posts: []     // Store the rendered post
    };
    this.nextPost = 0;
    this.postSize = 0;
  }

  // App props
  static propTypes= {
    pokemons: PropTypes.array.isRequired,             // Store pokemon's url data
    requestAllPokemonUrl: PropTypes.func.isRequired,  // Function to request all pokemon data, passed from App
    initialPost: PropTypes.number.isRequired,         // Number of pokemon's profile that posted on initial request
    postPerReq: PropTypes.number.isRequired           // Number of pokemon's profile per request
  };

  // Override Component functions
  // Called before render
  componentWillMount(){
    if(this.props.pokemons.length === 0){
      this.nextPost = 0;
      this.postSize = 0;
      this.props.requestAllPokemonUrl('http://pokeapi.salestock.net/api/v2/pokemon/');
    }
  }

  // Called after render
  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
    if(this.nextPost === 0 && (this.props.pokemons.length !== 0) && (this.props.pokemons.length > this.props.initialPost)){
      this.postSize = this.props.pokemons.length;
      for(var i=0; i < this.props.initialPost; i++){
        this.requestPost(this.props.pokemons[this.nextPost].url);
      }
      if (this.refs.posts){
        this.setState(this.state);
      }
    }
  };

  // Called on render unmount
  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll);
  };

  // Let pokemon component to request the pokemon's profile at url given
  requestPost = (pokeUrl) => {
    this.state.posts.push(
      <Pokemon key={pokeUrl} pokeUrl={pokeUrl}/>
    );
    this.nextPost++;
  };

  // Button event
  handleButton = () => {}

  // Scroll event
  handleScroll = () => {
    if((document.body.scrollTop+window.innerHeight) === document.body.scrollHeight){
      if((this.nextPost+this.props.postPerReq) >= this.postSize && (this.props.next !== null)){

      }else{
        for(var i=0; i < this.props.initialPost; i++){
          this.requestPost(this.props.pokemons[this.nextPost].url);
        }
        if (this.refs.posts){
          this.setState(this.state);
        }
      }
    }
  };

  // App render
  render(){
    // Empty pokemon condition
    if(this.props.pokemons.length === 0){
      return(
        <div>Loading...</div>
      );
    }

    return(
      <div>
        <div ref="posts">
          {this.state.posts}
        </div>
        <div className="footer_container">
          <Button ref="button_more" onClick={this.handleButton.bind(this)}>See more</Button>
        </div>
      </div>
    );
  };
};
