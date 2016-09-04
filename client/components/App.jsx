import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Icon from 'react-fa';

@observer
export default class App extends Component {
  renderNavbar() {
    return (
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>Task Management</Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }

  render() {
    return (
      <div>
        {this.renderNavbar()}
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
