import React, { Component } from 'react';
import YandexTranslate from 'yandex-translate';

import Inputfield from './components/inputField';
import AnswerButtonList from './components/answerButtonList';
import ConclusionMessage from './components/conclusionMessage';
import TranslatedString from './components/translatedString';
import PlayerRender from './components/playerRender';

import YandexApiKey from './yandex-api-key';

const importantLangTable = ['Japanese', 'Esperanto', 'Swedish',
'Estonian', 'Latin', 'Finnish', 'Chinese', 'Greek',
 'Russian', 'German', 'Afrikaans'
];

const importantLangKeyTable = ['ja', 'eo', 'sv', 'et', 'la',
'fi', 'zh', 'el', 'ru', 'de', 'af'];

const yandexInstance = YandexTranslate(YandexApiKey);

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      gameProcess: 0,
      resultText: "",
      rightAnswerKey: "",
      AnswerMessage: "",
      userAnsweredRight: false,
      player: {}
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
      if (this.state.gameProcess === 1) {
        this.setState((state) => ({gameProcess: state.gameProcess + 1}));        
      } 
      this.setState({userAnsweredRight: true});
    }
    else {
      this.setState({AnswerMessage: ("NO IT's " + this.state.rightAnswerKey + " you dumbass :D:D:D:")}, () => {
        console.log("inside checkAnswer: wronganswerGiven: " + this.state.wrongAnswerGiven);
      });
      if (this.state.gameProcess === 1) {
        this.setState((state) => ({gameProcess: state.gameProcess + 1}));        
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
      this.setState((state) => ({gameProcess: state.gameProcess + 1}));        
    }
  }

  render() {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return ( 
      <div>
        <Inputfield 
          onSubmit={this.translateText} 
        />
        <TranslatedString 
         printableTranslation={this.state.resultText}
        />
        {this.state.gameProcess === 1 && (
          <AnswerButtonList
            numbers={numbers}
            label={importantLangTable} 
            checkAnswer={this.checkAnswer}
          />
        )} 
        <ConclusionMessage 
         label={this.state.AnswerMessage}
        />

        <PlayerRender 
          gameProcess={this.state.gameProcess}
          userAnsweredRight={this.state.userAnsweredRight}
        />
      </div>
    );
  }
}

export default App;