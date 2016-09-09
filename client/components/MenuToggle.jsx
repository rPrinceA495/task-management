import React, { Component } from 'react';
import Icon from 'react-fa';

export default class MenuToggle extends Component {
  constructor(props) {
    super(props);
    this.handleClick = ::this.handleClick;
  }

  handleClick(event) {
    event.preventDefault();
    this.props.onClick();
  }

  render() {
    return (
      <a
        href=""
        onClick={this.handleClick}>
        <Icon
          name="ellipsis-h"
          size="lg" />
      </a>
    );
  }
}
