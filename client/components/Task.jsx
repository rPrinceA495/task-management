import React from 'react';
import Icon from 'react-fa';

export default class Task extends React.Component {
  static propTypes = {
    task: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      isSelected: false
    };
    this.handleMouseEnter = ::this.handleMouseEnter;
    this.handleMouseLeave = ::this.handleMouseLeave;
  }

  handleMouseEnter() {
    this.setState({
      isSelected: true
    });
  }

  handleMouseLeave() {
    this.setState({
      isSelected: false
    });
  }

  render() {
    return (
      <div
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}>

        {this.props.task.name}
  
      </div>
    );
  }
}
