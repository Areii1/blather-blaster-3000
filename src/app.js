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
      resultText: "",
      rightAnswerName: "",
      userAnsweredRight: false,
      languageOptionsKeyTable: [] 
    }

    this.translateText = this.translateText.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  checkAnswer(clickedLangName) {
    if (this.state.gameProcess === 1) {
      if (clickedLangName === this.state.rightAnswerName) {
        this.setState({
          userAnsweredRight: true,
          gameProcess: 2
        });
      }
      else {
        this.setState({
          userAnsweredRight: false,
          gameProcess: 2
        });
      }
    }
  }

  translateText(submittedText) {
    if (this.state.gameProcess === 0) {
      this.setState({gameProcess: 1});

      const langugageKeys = Object.keys(languageInformation);
      const shuffledLanguages = shuffle(langugageKeys);
      const fiveRandomLanguages = shuffledLanguages.splice(0, 5);
      const rightLanguage = randomFromArray(fiveRandomLanguages);

      const randSpeaker = languageInformation[rightLanguage].speaker;

      yandexInstance.translate(submittedText, { to: rightLanguage }, (err, res) => {
        this.setState({
          resultText: res.text[0],
          rightAnswerName: languageInformation[rightLanguage].name,
        })
        console.log("res text", res.text);
        console.log("rightLanguage: ", rightLanguage);
        responsiveVoice.speak(res.text[0], randSpeaker);
      });

      this.setState({languageOptionsKeyTable: fiveRandomLanguages});
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
              optionsList={this.state.languageOptionsKeyTable}
              rightAnswerName={this.rightAnswerName}
              languageInformation={languageInformation}
              checkAnswer={this.checkAnswer}
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