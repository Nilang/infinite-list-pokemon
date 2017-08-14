import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import {Link} from 'react-router-dom';
import {
  Badge,
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
    requestAllPokemonUrl: PropTypes.func.isRequired,
    clearPokemon: PropTypes.func.isRequired,
    requestPokemonUrlByType: PropTypes.func.isRequired
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
      this.requestAllPokemon();
    }else{
      this.props.requestPokemonUrlByType(typeUrl);
    }
  };

  requestAllPokemon = () => {
    if(this.props.urlStat !== 1){
      this.props.clearPokemon();
      this.props.requestAllPokemonUrl("https://pokeapi.salestock.net/api/v2/pokemon/");
    }
  };

  componentDidMount(){
    this.requestTypes('https://pokeapi.salestock.net/api/v2/type/');
  };



  render(){
    return(
      <div>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Pokedex</Link>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <LinkContainer to='/allpokemon' onClick={ () => this.requestAllPokemon() }>
                <NavItem>
                  <p>
                    All Pokemon <Badge className="badge__type-fire">beta</Badge>
                  </p>
                </NavItem>
              </LinkContainer>
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
