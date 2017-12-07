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
    console.log(this.props.label + this.props.id + ": clicked");
    this.props.checkAnswer(this.props.id);
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