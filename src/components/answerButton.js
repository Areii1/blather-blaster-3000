import React, { Component } from 'react';

class AnswerButton extends Component {
  render () {
    return (
    <div>
      <button></button>
      <p>{this.props.label}</p>
    </div>
    );
  }
}

export default AnswerButton;