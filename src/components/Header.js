import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {
  Collapse,
  ControlLabel,
  FormControl,
  FormGroup,
  Nav,
  Navbar,
  NavItem,
  Panel
} from 'react-bootstrap';

export default class Header extends Component {

  static propTypes = {
    refreshPokemons: PropTypes.func.isRequired,
    clearPokemon: PropTypes.func.isRequired,
    requestPokemons: PropTypes.func.isRequired
  };

  constructor(){
    super();
    this.state = {
      collapsestat: false,
      types: []
    };
  };

  requestTypes = (targetUrl) => {
    fetch(targetUrl)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          types: responseData.results
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  onSelectChange = (event) => {
    let typeUrl = event.target.value;
    if(typeUrl === "all"){
      this.props.clearPokemon();
      this.props.requestPokemons("http://pokeapi.salestock.net/api/v2/pokemon/");
    }else{
      this.props.refreshPokemons(typeUrl);
    }
  };

  componentDidMount(){
    this.requestTypes('http://pokeapi.salestock.net/api/v2/type/');
  };



  render(){
    return(
      <div>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Pokedex</Link>
            </Navbar.Brand>
            <Navbar.Toggle/>          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem onClick={ () => this.setState({ collapsestat: !this.state.collapsestat }) }>Filter</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Collapse in={this.state.collapsestat}>
          <div>
            <Panel>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Type</ControlLabel>
                <FormControl
                  componentClass="select"
                  placeholder="select type"
                  onChange={this.onSelectChange.bind(this)}
                  >
                  <option value="all">All</option>
                  {this.state.types.map((type, index) => {
                    return(
                      <option key={'select_'+index} value={type.url}>{type.name}</option>
                    );
                  })}
                </FormControl>
              </FormGroup>
            </Panel>
          </div>
        </Collapse>
      </div>
    );
  }
};
