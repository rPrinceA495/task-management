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
      <tr
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}>
        <td className="text-info"><Icon name="minus" fixedWidth /> {this.props.task.name}</td>
        <td className="text-info"><Icon name="user" fixedWidth /> </td>
      </tr>
    );
  }
}
