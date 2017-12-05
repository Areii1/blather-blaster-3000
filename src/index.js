import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YandexTranslate from 'yandex-translate';

import Inputfield from './components/inputField';
import AnswerButton from './components/answerButton';
import ConclusionMessage from './components/conclusionMessage';

import apiKey from './api-key';

const yandexInstance = YandexTranslate(apiKey);
console.log(yandexInstance);

yandexInstance.translate('You can burn my house, steal my car, drink my liquor from an old fruitjar.', { to: 'fi' }, function(err, res) {
  console.log(res.text);
});

class App extends Component {
  render () {
    return ( 
      <div>
        <Inputfield />
        <AnswerButton label="korean" />
        <AnswerButton label="english" />
        <AnswerButton label="finnish" />
        <AnswerButton />
        <AnswerButton />
        <ConclusionMessage />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
