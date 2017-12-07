import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YandexTranslate from 'yandex-translate';

import Inputfield from './components/inputField';
import AnswerButton from './components/answerButton';
import ConclusionMessage from './components/conclusionMessage';
import TranslatedString from './components/translatedString';

import apiKey from './api-key';


const importantLangKeyTable = ['ja', 'eo', 'sv', 'et', 'la',
'fi', 'zh', 'el', 'ru', 'de', 'af'
];

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

  getRandomLang() {
    return importantLangKeyTable[(Math.floor(Math.random() * 10) + 1)];
  }

  translateText(submittedText) {
    var randLangKey = this.getRandomLang();
    this.setState({textFieldValueSubmitted: submittedText}, () => {
      yandexInstance.translate(this.state.textFieldValueSubmitted, { to: randLangKey }, (err, res) => {
        this.setState({resultText: res.text});
        console.log(randLangKey);
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
