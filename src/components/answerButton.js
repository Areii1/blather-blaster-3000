import React, { Component } from 'react';

class AnswerButton extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.checkAnswer(this.props.label);
  }
  
  render () {
    return (
      <button onClick={this.handleClick}>{this.props.label}</button>
    );
  }
}

export default AnswerButton;