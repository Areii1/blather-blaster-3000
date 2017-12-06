import React, { Component } from 'react';

class AnswerButton extends Component {
  render () {
    return (
    <div>
      <button>{this.props.label}</button>
    </div>
    );
  }
}

export default AnswerButton;