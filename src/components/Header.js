import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {
  Button,
  Collapse,
  FormGroup,
  MenuItem,
  Nav,
  Navbar,
  NavDropdown,
  NavItem,
  Panel
} from 'react-bootstrap';

export default class Header extends Component {

  constructor(){
    super();
    this.state = {
      collapsestat: false
    };
  }

  render(){
    return(
      <div>
        <Navbar>
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
              This form for filter.
            </Panel>
          </div>
        </Collapse>
      </div>
    );
  }
};
