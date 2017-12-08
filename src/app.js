import React, { Component } from 'react';
import YandexTranslate from 'yandex-translate';
import responsiveVoice from './responsivevoice';

import Inputfield from './components/inputField';
import AnswerButtonList from './components/answerButtonList';
import ConclusionMessage from './components/conclusionMessage';

import YandexApiKey from './yandex-api-key';

const importantLangTable = ['Japanese', 'Esperanto', 'Swedish',
'Estonian', 'Latin', 'Finnish', 'Chinese', 'Greek',
 'Russian', 'German', 'Afrikaans'
];

const importantTable = {
  ja : 'Japanese',
  eo : 'Esperanto',
  sv : 'Swedish',
  la : 'Latin',
  fi : 'Finland',
  zh : 'Chinese',
  el : 'Greek',
  ru : 'Russian',
  de : 'German',
  af : 'Afrikaans'
}

const responsiveVoiceTable = ['Japanese Female', 'Japanese Female',
 'Swedish Female', 'Finnish Female', 'US English Male', 'Finnish Female',
'Chinese Female', 'Greek Female', 'Russian Female', 'Russian Female', 'Afrikaans Male'];

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
    this.resetGame = this.resetGame.bind(this);
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

      const randNum = (Math.floor(Math.random() * 10) + 1);
      const randLangKey = importantLangKeyTable[randNum];

      const respTalker = responsiveVoiceTable[randNum];

      yandexInstance.translate(submittedText, { to: randLangKey }, (err, res) => {
        this.setState({
          resultText: res.text,
          rightAnswerKey: randLangKey,
        })
        responsiveVoice.speak(res.text[0], respTalker);
      });
    }
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
          resetGame={this.resetGame}
          />
        )}
      </div>
    );
  }
}

export default App;