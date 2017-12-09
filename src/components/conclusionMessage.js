import React, { Component } from 'react';

class ConclusionMessage extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.resetGame();
  }

  render () {
    return (
      <div>
        {this.props.answer && (
          <h3>You are correct</h3>
        )}
        {!this.props.answer && (
        <div>
          <h3>You are wrong</h3>
          <p>she was talking {this.props.rightAnswerName} actually :) </p>
        </div>
        )}
        <button onClick={this.handleClick}>Play again</button>
      </div>
    );
  }
}

export default ConclusionMessage;