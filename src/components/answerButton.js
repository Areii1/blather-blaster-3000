import React, { Component } from 'react';

class AnswerButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonClicked: true
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.checkAnswer(this.props.number);
  }
  
  render () {
    return (
    <div>
      <button onClick={this.handleClick}>{this.props.label}</button>
    </div>
    );
  }
}

export default AnswerButton;