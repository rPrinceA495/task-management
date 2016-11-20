import React, { Component } from 'react';
import Icon from 'react-fa';

export default class MenuToggle extends Component {
  constructor(props) {
    super(props);
    this.handleClick = ::this.handleClick;
  }

  handleClick(event) {
    event.stopPropagation();
    this.props.onClick();
  }

  render() {
    return (
      <button
        onClick={this.handleClick}
        className="menu-toggle">
        <Icon
          name="ellipsis-h"
          size="lg" />
      </button>
    );
  }
}
