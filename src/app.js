import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YandexTranslate from 'yandex-translate';

import Inputfield from './components/inputField';
import AnswerButton from './components/answerButton';
import AnswerButtonList from './components/answerButtonList';
import ConclusionMessage from './components/conclusionMessage';
import TranslatedString from './components/translatedString';

import apiKey from './api-key';

const importantLangTable = ['Japanese', 'Esperanto', 'Swedish',
'Estonian', 'Latin', 'Finnish', 'Chinese', 'Greek',
 'Russian', 'German', 'Afrikaans'
];

const importantLangKeyTable = ['ja', 'eo', 'sv', 'et', 'la',
'fi', 'zh', 'el', 'ru', 'de', 'af'];

const yandexInstance = YandexTranslate(apiKey);

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      gameprocess: 0,
      textFieldValueSubmitted: "",
      resultText: "",
      rightAnswerKey: "",
      AnswerMessage: ""
    }

    this.translateText = this.translateText.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  getRandomLang() {
    const randNum = (Math.floor(Math.random() * 10) + 1);
    return importantLangKeyTable[randNum];
  }

  checkAnswer(buttonClicked) {
    console.log("click reached index");
    console.log("Right ANSWER: " + this.state.rightAnswerKey);

    if (importantLangKeyTable[buttonClicked] === this.state.rightAnswerKey) {
      this.setState({AnswerMessage: "You are absolutely RIGHT >:))), kudos to you my friend"}, () => {
        console.log("inside checkAnswer : rightanswerGiven: " + this.state.rightAnswerGiven);
      });
    }
    else {
      this.setState({AnswerMessage: ("NO IT's " + this.state.rightAnswerKey + " you dumbass :D:D:D:")}, () => {
        console.log("inside checkAnswer: wronganswerGiven: " + this.state.wrongAnswerGiven);
      });
    }
  }

  translateText(submittedText) {
    console.log("submit reached index");
    var randLangKey = this.getRandomLang();
    this.setState({textFieldValueSubmitted: submittedText}, () => {
      yandexInstance.translate(this.state.textFieldValueSubmitted, { to: randLangKey }, (err, res) => {
        this.setState({resultText: res.text});
        this.setState({rightAnswerKey: randLangKey});
        this.setState({gameprocess: 1});
      });
    });
  }
      
  render() {
    return ( 
      <div>
        <Inputfield 
          transable={this.translateText} 
        />
        <TranslatedString 
         printableTranslation={this.state.resultText}
        />
        <AnswerButtonList 
          label={importantLangTable} 
          checkAnswer={this.checkAnswer}
        />
        <ConclusionMessage 
         label={this.state.AnswerMessage} 
        />
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
