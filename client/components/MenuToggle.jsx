import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-fa';

export default class MenuToggle extends Component {
  static propTypes = {
    onClick: PropTypes.func,
  };

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
