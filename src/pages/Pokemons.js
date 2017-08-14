import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ListGroup
 } from 'react-bootstrap';

import Pokemon from './Pokemon';

export default class Pokemons extends Component {

  static nextPost;
  static postSize;

  constructor(){
    super();
    this.state={
      posts: [],
      request: false
    };
    this.nextPost = 0;
    this.postSize = 0;
  }

  static propTypes= {
    requestPokemons: PropTypes.func.isRequired,
    pokemons: PropTypes.array.isRequired,
    initialPost: PropTypes.number.isRequired,
    postPerReq: PropTypes.number.isRequired
  };

  componentWillMount(){
    if(this.props.pokemons.length === 0){
      this.nextPost = 0;
      this.postSize = 0;
    }
  }

  componentDidMount(){
    if(this.state.request){
      console.log(this.state.posts);
      console.log("requested");
    }
    console.log(this.state.posts);
    window.addEventListener('scroll', this.handleScroll);
    if(this.nextPost === 0 && (this.props.pokemons.length !== 0) && (this.props.pokemons.length > this.props.initialPost)){
      this.postSize = this.props.pokemons.length;
      console.log(this.postSize);
      for(var i=0; i < this.props.initialPost; i++){
        this.requestPost(this.props.pokemons[this.nextPost].url);
      }
      this.setState(this.state);
    }
  };

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll);
  };

  requestPost = (pokeUrl) => {
    this.state.posts.push(
      <Pokemon key={'pokemon'+this.nextPost} pokeUrl={pokeUrl}/>
    );
    this.nextPost++;
  };

  handleButton = () => {
    // this.props.requestPokemons();
  };

  handleScroll = () => {
    if((document.body.scrollTop+window.innerHeight) === document.body.scrollHeight){
      if((this.nextPost+this.props.postPerReq) >= this.postSize && (this.props.next !== null)){
        this.props.requestPokemons();
        this.state.request = true;
      }else{
        for(var i=0; i < this.props.initialPost; i++){
          this.requestPost(this.props.pokemons[this.nextPost].url);
        }
        this.setState(this.state);
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
        <ListGroup>
          {this.state.posts}
        </ListGroup>
        <div className="footer_container">
          <Button ref="button_more" onClick={this.handleButton.bind(this)}>See more</Button>
        </div>
      </div>
    );
  };
};
