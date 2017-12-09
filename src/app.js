import React, { Component } from 'react';
import YandexTranslate from 'yandex-translate';
import responsiveVoice from './responsivevoice';

import Inputfield from './components/inputField';
import AnswerButtonList from './components/answerButtonList';
import ConclusionMessage from './components/conclusionMessage';

import YandexApiKey from './yandex-api-key';

const importantAnotherTable = {
  ja : {name: 'Japanese', speaker: 'Japanese Female'},
  sv : {name: 'Swedish', speaker: 'Swedish Female'},
  fi : {name: 'Finland', speaker: 'Finnish Female'},
  zh : {name: 'Chinese', speaker: 'Chinese Female'},
  el : {name: 'Greek', speaker: 'Greek Female'},
  ru : {name: 'Russian', speaker: 'Russian Female'},
  af : {name: 'Afrikaans', speaker: 'Afrikaans Male'}
}

const yandexInstance = YandexTranslate(YandexApiKey);

function randomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      gameProcess: 0,
      resultText: "",
      rightAnswerName: "",
      userAnsweredRight: false,
    }

    this.translateText = this.translateText.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  checkAnswer(clickedLangName) {
    if (this.state.gameProcess === 1) {
      this.setState({gameProcess: 2})
      if (clickedLangName === this.state.rightAnswerName) {
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

      const keytable = Object.keys(importantAnotherTable);
      const randKey = randomFromArray(keytable);
      const randSpeaker = importantAnotherTable[randKey].speaker;

      yandexInstance.translate(submittedText, { to: randKey }, (err, res) => {
        this.setState({
          resultText: res.text[0],
          rightAnswerName: importantAnotherTable[randKey].name,
        })
        console.log("res text", res.text);
        responsiveVoice.speak(res.text[0], randSpeaker);
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
              importantAnotherTable={importantAnotherTable}
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