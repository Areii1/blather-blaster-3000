import React, { Component } from 'react';

class AnswerButton extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("clicked: ", this.props.label);
    this.props.checkAnswer(this.props.label);
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