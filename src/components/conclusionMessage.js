import React, { Component } from 'react';

class ConclusionMessage extends Component {

  render () {
    return (
      <div>
        {this.props.answer && (
          <h3>You are correct</h3>
        )}
         {!this.props.answer && (
          <h3>You are wrong</h3>
         )}
      </div>
    );
  }
}

export default ConclusionMessage;