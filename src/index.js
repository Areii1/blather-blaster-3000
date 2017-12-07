import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YandexTranslate from 'yandex-translate';

import Inputfield from './components/inputField';
import AnswerButton from './components/answerButton';
import ConclusionMessage from './components/conclusionMessage';
import TranslatedString from './components/translatedString';

import apiKey from './api-key';

const yandexInstance = YandexTranslate(apiKey);

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      gameprocess: 0,
      textFieldValueSubmitted: '',
      resultText: ""
    }

    this.translateText = this.translateText.bind(this); 
  }

  translateText(para) {
    this.setState({textFieldValueSubmitted: para}, () => {
      yandexInstance.translate(this.state.textFieldValueSubmitted, { to: 'fi' }, (err, res) => {
        this.setState({resultText: res.text});
      });
    });
  }
      
  render() {
    return ( 
      <div>
        <Inputfield transable={this.translateText}/>
        <TranslatedString printableTranslation={this.state.resultText}/>
        <AnswerButton label="korean" />
        <AnswerButton label="english" />
        <AnswerButton label="finnish" />
        <AnswerButton label="portuguese" />
        <AnswerButton label="swedish" />
        <ConclusionMessage label="You answered correctly" />
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
