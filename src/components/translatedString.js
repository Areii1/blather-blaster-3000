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
        <p>{this.props.transStr}</p>
      </div>
    );
  }
}

export default TranslatedString; 