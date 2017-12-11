import React, { Component } from 'react';
import YandexTranslate from 'yandex-translate';
import responsiveVoice from './responsivevoice';
import yandexApiKey from './yandex-api-key';

import languageInformation from './langList';
import Inputfield from './components/inputField';
import AnswerButtonList from './components/answerButtonList';
import {ConclusionMessage} from './components/conclusionMessage';

import './app.css';
import talkinghead from './media/bla_white.png';

import {randomFromArray, shuffle} from './utils';

const yandexInstance = YandexTranslate(yandexApiKey);

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      gameProcess: 0,
      rightAnswerName: "",
      userAnsweredRight: false,
      randomLanguageOptions: [],
      showSpinner: false,
      score: 0,
      mistakesInARow: 0
    }

    this.translateText = this.translateText.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  checkAnswer(clickedLangName) {
    responsiveVoice.cancel();
    const answerWasRight = clickedLangName === this.state.rightAnswerName;
    this.setState({
      userAnsweredRight: answerWasRight,
      score: answerWasRight ? this.state.score + 1 : this.state.score - 1,
      mistakesInARow: answerWasRight ? 0 : this.state.mistakesInARow + 1,
      gameProcess: 2
    })
  }

  translateText(submittedText) {
    if (submittedText) {
      this.setState({
        gameProcess: 1,
        showSpinner: true
      });

      const langugageKeys = Object.keys(languageInformation);
      const shuffledLanguages = shuffle(langugageKeys);
      const fiveRandomLanguages = shuffledLanguages.splice(0, 5);
      const rightLanguage = randomFromArray(fiveRandomLanguages);

      const randSpeaker = languageInformation[rightLanguage].speaker;
      yandexInstance.translate(submittedText, { to: rightLanguage }, (err, res) => {
        this.setState({
          rightAnswerName: languageInformation[rightLanguage].name,
          showSpinner: false,
          randomLanguageOptions: fiveRandomLanguages
        });
        console.log('yandexTranslate error', err);

        responsiveVoice.speak(res.text[0], randSpeaker);
      });
    }
  }

  resetGame() {
    this.setState({
      gameProcess: 0,
      rightAnswerName: '',
      userAnsweredRight: false,
      randomLanguageOptions: [],
    });
  }

  render() {
    return ( 
      <div id="app">
        <img src={talkinghead} id="talking-head" alt="talkinghead"/>
        <h1 id="main-header">Blather Blaster 3000</h1>
        {this.state.gameProcess === 0 && (
          <Inputfield onSubmit={this.translateText} />
        )}

        {this.state.gameProcess === 1 && (
          <div>
            <AnswerButtonList
              optionsList={this.state.randomLanguageOptions}
              rightAnswerName={this.rightAnswerName}
              languageInformation={languageInformation}
              checkAnswer={this.checkAnswer}
              showSpinner={this.state.showSpinner}
            />
          </div>
        )}

        {this.state.gameProcess === 2 && (
          <ConclusionMessage 
            answer={this.state.userAnsweredRight}
            resetGame={this.resetGame}
            rightAnswerName={this.state.rightAnswerName}
            mistakesInARow={this.state.mistakesInARow}
          />
        )}
        <p id="score">Score: {this.state.score}</p>
      </div>
    );
  }
}

export default App;