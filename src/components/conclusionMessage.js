import React, { Component } from 'react';

class ConclusionMessage extends Component {

  render () {
    return (
      <div>
        <h3>{this.props.label}</h3>
      </div>
    );
  }
}

export default ConclusionMessage;