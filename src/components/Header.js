import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {
  Button,
  Collapse,
  ControlLabel,
  FormControl,
  FormGroup,
  MenuItem,
  Nav,
  Navbar,
  NavDropdown,
  NavItem,
  Panel
} from 'react-bootstrap';

export default class Header extends Component {

  static propTypes = {
    refresh: PropTypes.string
  };

  constructor(){
    super();
    this.state = {
      collapsestat: false,
      type: []
    };
  }

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
                <FormControl componentClass="select" placeholder="select">
                  <option value="select">select</option>
                  <option value="other">...</option>
                </FormControl>
              </FormGroup>
            </Panel>
          </div>
        </Collapse>
      </div>
    );
  }
};
