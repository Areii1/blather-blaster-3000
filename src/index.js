import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YandexTranslate from 'yandex-translate';

import Inputfield from './components/inputField';
import AnswerButton from './components/answerButton';
import ConclusionMessage from './components/conclusionMessage';

import apiKey from './api-key';

const yandexInstance = YandexTranslate(apiKey);
console.log(yandexInstance);

class App extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        translatedText : ''
      }
    }
    render () {
      return ( 
        <div>
          <Inputfield />
          <AnswerButton label="korean" />
          <AnswerButton label="english" />
          <AnswerButton label="finnish" />
          <AnswerButton label="portuguese" />
          <AnswerButton label="swedish" />
          <ConclusionMessage id="hehee" label="You answered correctly" />
          <p></p>
        </div>
      );
    }

/*
  translateText(text) {
    yandexInstance.translate(text, { to: 'fi' }, function(err, res) {
      console.log(res.text);
      <p>{res.text}</p>
    });
  }
*/
  }


export default App;

ReactDOM.render(<App />, document.getElementById('root'));
