import React, { Component } from 'react';
import YandexTranslate from 'yandex-translate';
import responsiveVoice from './responsivevoice';

import languageInformation from './langList';
import Inputfield from './components/inputField';
import AnswerButtonList from './components/answerButtonList';
import ConclusionMessage from './components/conclusionMessage';

import YandexApiKey from './yandex-api-key';

const yandexInstance = YandexTranslate(YandexApiKey);

function randomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      gameProcess: 0,
      rightAnswerName: "",
      userAnsweredRight: false,
      languageOptionsKeyTable: [],
      showSpinner: false
    }

    this.translateText = this.translateText.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  checkAnswer(clickedLangName) {
    this.setState({
      userAnsweredRight: clickedLangName === this.state.rightAnswerName,
      gameProcess: 2
    })
  }

  translateText(submittedText) {
    if (this.state.gameProcess === 0) {
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
          languageOptionsKeyTable: fiveRandomLanguages
        });
        console.log('yandexTranslate errror', err);

        responsiveVoice.speak(res.text[0], randSpeaker);
      });
    }
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