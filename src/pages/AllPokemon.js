import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button
 } from 'react-bootstrap';

// App Component
import Pokemon from './Pokemon';

export default class AllPokemon extends Component {

  static nextPost;
  static postSize;

  constructor(){
    super();
    this.state={
      posts: []
    };
    this.nextPost = 0;
    this.postSize = 0;
  }

  static propTypes= {
    pokemons: PropTypes.array.isRequired,
    requestAllPokemonUrl: PropTypes.func.isRequired,
    initialPost: PropTypes.number.isRequired,
    postPerReq: PropTypes.number.isRequired
  };

  componentWillMount(){
    if(this.props.pokemons.length === 0){
      this.nextPost = 0;
      this.postSize = 0;
      this.props.requestAllPokemonUrl('http://pokeapi.salestock.net/api/v2/pokemon/');
    }
  }

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

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll);
  };

  requestPost = (pokeUrl) => {
    this.state.posts.push(
      <Pokemon key={pokeUrl} pokeUrl={pokeUrl}/>
    );
    this.nextPost++;
  };

  handleButton = () => {}

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
