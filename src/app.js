import React, { Component } from 'react';
import YandexTranslate from 'yandex-translate';

import Inputfield from './components/inputField';
import AnswerButtonList from './components/answerButtonList';
import ConclusionMessage from './components/conclusionMessage';
import TranslatedString from './components/translatedString';

import YandexApiKey from './yandex-api-key';

const importantLangTable = ['Japanese', 'Esperanto', 'Swedish',
'Estonian', 'Latin', 'Finnish', 'Chinese', 'Greek',
 'Russian', 'German', 'Afrikaans'
];

const importantLangKeyTable = ['ja', 'eo', 'sv', 'et', 'la',
'fi', 'zh', 'el', 'ru', 'de', 'af'];

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


const yandexInstance = YandexTranslate(YandexApiKey);

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      gameProcess: 0,
      resultText: "",
      rightAnswerKey: "",
      userAnsweredRight: false,
    }

    this.translateText = this.translateText.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.rightAnswer = this.rightAnswer.bind(this);
    this.incrementGameProcess = this.incrementGameProcess.bind(this);
  }

  getRandomLang() {
    const randNum = (Math.floor(Math.random() * 10) + 1);
    return importantLangKeyTable[randNum];
  }

  incrementGameProcess() {
    this.setState((state) => ({gameProcess: state.gameProcess + 1}));
  }

  checkAnswer(buttonClicked) {
    if (importantLangKeyTable[buttonClicked] === this.state.rightAnswerKey) {
      if (this.state.gameProcess === 1) {
        this.incrementGameProcess()    
      } 
      this.setState({userAnsweredRight: true});
    }
    else {
      if (this.state.gameProcess === 1) {
        this.incrementGameProcess()       
      }
    }
  }

  translateText(submittedText) {
    const randLangKey = this.getRandomLang();
    yandexInstance.translate(submittedText, { to: randLangKey }, (err, res) => {
      this.setState({
        resultText: res.text,
        rightAnswerKey: randLangKey
      })
    });
    if (this.state.gameProcess === 0) {
      this.incrementGameProcess()        
    }
  }

  rightAnswer() {
    console.log("inside RightAnswer")
    var rightAnswerIndex = 0;
    for (var i = 0; i > importantLangKeyTable.length; i++) {
      if (this.state.rightAnswerKey === importantLangKeyTable[i]) rightAnswerIndex = i;
    }
    return importantLangTable[rightAnswerIndex];
  }

  render() {

    return ( 
      <div>
          <Inputfield 
            onSubmit={this.translateText} 
          />

        {this.state.gameProcess === 1 && (
          <div>
            <TranslatedString 
            printableTranslation={this.state.resultText}
            />
            <AnswerButtonList
              numbers={numbers}
              label={importantLangTable} 
              checkAnswer={this.checkAnswer}
            />
          </div>
        )}

        {this.state.gameProcess === 2 && (
          <ConclusionMessage 
          answer={this.state.userAnsweredRight}
          rightAnswerLang={this.rightAnswer}
          />
        )}
      </div>
    );
  }
}

export default App;