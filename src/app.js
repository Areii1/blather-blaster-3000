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

function chooseXRandLanguageKeys(x) {
  console.log("inside ChooseXrandLanguageKeys parameter x is : ", x);
  var randKeyTable = [];
  for(var i = 0; i < x; i++) {
    randKeyTable[i] = randomFromArray(Object.keys(languageInformation));
  }
  console.log("ChooseXrandLanguageKeys randKeyTable after process is: ", randKeyTable);
  return randKeyTable;
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

      const keytable = Object.keys(languageInformation);
      const randKey = randomFromArray(keytable);
      const randSpeaker = languageInformation[randKey].speaker;

      yandexInstance.translate(submittedText, { to: randKey }, (err, res) => {
        this.setState({
          resultText: res.text[0],
          rightAnswerName: languageInformation[randKey].name,
        })
        console.log("res text", res.text);
        console.log("randKey: ", randKey);
        responsiveVoice.speak(res.text[0], randSpeaker);
      });
      var anotherFourLanguageKeys = chooseXRandLanguageKeys(4);
      var finishedTable = [];
      for (var i = 0; i < 5; i++) {
        if (i < 4) {
          finishedTable[i] = anotherFourLanguageKeys[i];
        }
        else if (i == 4) {
          finishedTable[i] = randKey;
        }
      }
      console.log("finishedTable: ", finishedTable);
      this.setState({languageOptionsKeyTable: finishedTable});
      console.log("languageOptionsKeyTable: ", this.state.languageOptionsKeyTable);
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