import React, { Component } from 'react';
import YandexTranslate from 'yandex-translate';
import responsiveVoice from './responsivevoice';

import languageInformation from './langList';
import Inputfield from './components/inputField';
import AnswerButtonList from './components/answerButtonList';
import ConclusionMessage from './components/conclusionMessage';

import {randomFromArray, shuffle} from './utils';

import YandexApiKey from './yandex-api-key';

const yandexInstance = YandexTranslate(YandexApiKey);

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      gameProcess: 0,
      rightAnswerName: "",
      userAnsweredRight: false,
      languageOptionsKeyTable: [],
      showSpinner: false,
      score: 0
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
      gameProcess: 2
    })
  }

  translateText(submittedText) {
    this.setState({
      gameProcess: 1,
      showSpinner: true
    });

    const langugageKeys = Object.keys(languageInformation);
    const shuffledLanguages = shuffle(langugageKeys);
    const fiveRandomLanguages = shuffledLanguages.splice(0, 5);
    const rightLanguage = randomFromArray(fiveRandomLanguages);

    const randSpeaker = languageInformation[rightLanguage].speaker;
    console.log('key send to yandex: ', rightLanguage);
    yandexInstance.translate(submittedText, { to: rightLanguage }, (err, res) => {
      this.setState({
        rightAnswerName: languageInformation[rightLanguage].name,
        showSpinner: false,
        languageOptionsKeyTable: fiveRandomLanguages
      });
      console.log('yandexTranslate errror', err);
      console.log('yandex response :', res);

      responsiveVoice.speak(res.text[0], randSpeaker);
    });
  }

  resetGame() {
    this.setState({
      gameProcess: 0,
      rightAnswerName: '',
      userAnsweredRight: false,
      languageOptionsKeyTable: [],
    });
  }

  render() {
    return ( 
      <div>
        <h1>Guess the language</h1>
        <p>Score: {this.state.score}</p>
        {this.state.gameProcess === 0 && (
          <Inputfield onSubmit={this.translateText} />
        )}

        {this.state.gameProcess === 1 && (
          <div>
            <AnswerButtonList
              optionsList={this.state.languageOptionsKeyTable}
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
          />
        )}
      </div>
    );
  }
}

export default App;