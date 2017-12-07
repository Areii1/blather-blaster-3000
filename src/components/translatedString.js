import React, { Component } from 'react';
import YandexTranslate from 'yandex-translate';
import apiKey from '../api-key';

class TranslatedString extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <p>{this.props.printableTranslation}</p>
      </div>
    );
  }
}

export default TranslatedString; 