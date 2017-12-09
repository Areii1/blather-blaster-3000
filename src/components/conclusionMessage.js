import React, { Component } from 'react';

class ConclusionMessage extends Component {
  render () {
    return (
      <div>
        {this.props.answer && (
          <h3>You are correct</h3>
        )}
        {!this.props.answer && (
        <div>
          <h3>You are wrong</h3>
          <p>that was {this.props.rightAnswerName} actually :) </p>
        </div>
        )}
        <button onClick={this.props.resetGame}>Play again</button>
      </div>
    );
  }
}

export default ConclusionMessage;