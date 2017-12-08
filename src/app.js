import React, { Component } from 'react';
import YandexTranslate from 'yandex-translate';

import Inputfield from './components/inputField';
import AnswerButtonList from './components/answerButtonList';
import ConclusionMessage from './components/conclusionMessage';
import TranslatedString from './components/translatedString';
import responsiveVoice from './responsivevoice';

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
    this.resetGame = this.resetGame.bind(this);
  }

  getRandomLang() {
    const randNum = (Math.floor(Math.random() * 10) + 1);
    return importantLangKeyTable[randNum];
  }

  checkAnswer(clickedButtonIndex) {
    if (this.state.gameProcess === 1) {
      this.setState({gameProcess: 2})
      if (importantLangKeyTable[clickedButtonIndex] === this.state.rightAnswerKey) {
        this.setState({userAnsweredRight: true});
      }
      else {
        this.setState({userAnsweredRight: false});
      }
    }
  }

  translateText(submittedText) {
    if (this.state.gameProcess === 0) {
      this.setState({gameProcess: 1});
      const randLangKey = this.getRandomLang();

      yandexInstance.translate(submittedText, { to: randLangKey }, (err, res) => {
        this.setState({
          resultText: res.text,
          rightAnswerKey: randLangKey
        })
      });
      responsiveVoice.speak(submittedText);
    }
  }

  rightAnswer() {
    var rightAnswerIndex = 0;
    for (var i = 0; i > importantLangKeyTable.length; i++) {
      if (this.state.rightAnswerKey === importantLangKeyTable[i]) {
        rightAnswerIndex = i;
      }
    }
    return importantLangTable[rightAnswerIndex];
  }

  resetGame() {
    this.setState({gameProcess: 0});
  }

  render() {
    console.log("gameProcess inside render : " + this.state.gameProcess);

    return ( 
      <div>
          <Inputfield 
            onSubmit={this.translateText} 
            gameProcess={this.state.gameProcess}
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
          resetGame={this.resetGame}
          />
        )}
      </div>
    );
  }
}

export default App;