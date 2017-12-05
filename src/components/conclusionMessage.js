import React, { Component } from 'react';

class ConclusionMessage extends Component {
  render () {
    return (
      <h3>{this.props.label}</h3>
    );
  }
}

export default ConclusionMessage;