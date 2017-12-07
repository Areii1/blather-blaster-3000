import React, { Component } from 'react';

class TranslatedString extends Component {

  render () {
    return (
      <div>
        <p>{this.props.printableTranslation}</p>
      </div>
    );
  }
}

export default TranslatedString; 