import React, { Component } from 'react';
import YandexTranslate from 'yandex-translate';
/*import VoiceRSS from './voicerss-tts-min';*/

import Inputfield from './components/inputField';
import AnswerButton from './components/answerButton';
import AnswerButtonList from './components/answerButtonList';
import ConclusionMessage from './components/conclusionMessage';
import TranslatedString from './components/translatedString';
import PlayerRender from './components/playerRender';

import YandexApiKey from './yandex-api-key';
import RssApiKey from './rss-api-key';

const importantLangTable = ['Japanese', 'Esperanto', 'Swedish',
'Estonian', 'Latin', 'Finnish', 'Chinese', 'Greek',
 'Russian', 'German', 'Afrikaans'
];

const importantLangKeyTable = ['ja', 'eo', 'sv', 'et', 'la',
'fi', 'zh', 'el', 'ru', 'de', 'af'];

const yandexInstance = YandexTranslate(YandexApiKey);


/*DOESTN WORK*/ 
/*
const whadup = VoiceRSS.speech({
  key: RssApiKey,
  src: 'Hello, world!',
  hl: 'en-us',
  r: 0, 
  c: 'mp3',
  f: '44khz_16bit_stereo',
  ssml: false
});
*/

/*DOESTN WORK*/ 
/*
var mpg321 = require('mpg321');
 
var
file = './hurroo.mp3',
player = mpg321().remote();
 
// infinity loop 
player.play(file);
player.on('end', function () {
  console.log('end');
  player.play(file);
});
 
// SIGINT hack 
process.on('SIGINT', function () {
  process.exit();
});
 
// SIGINT hack 
process.on('SIGINT', function (data) {
  process.exit();
});
*/

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      gameProcess: 0,
      textFieldValueSubmitted: "",
      resultText: "",
      rightAnswerKey: "",
      AnswerMessage: "",
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
      this.setState((state) => ({gameProcess: state.gameProcess + 1}));
    }
    else {
      this.setState({AnswerMessage: ("NO IT's " + this.state.rightAnswerKey + " you dumbass :D:D:D:")}, () => {
        console.log("inside checkAnswer: wronganswerGiven: " + this.state.wrongAnswerGiven);
      });
      this.setState((state) => ({gameProcess: state.gameProcess + 1}));
    }
  }

  translateText(submittedText) {
    console.log("submit reached index");
    var randLangKey = this.getRandomLang();
    this.setState({textFieldValueSubmitted: submittedText}, () => {
      yandexInstance.translate(this.state.textFieldValueSubmitted, { to: randLangKey }, (err, res) => {
        this.setState({resultText: res.text});
        this.setState({rightAnswerKey: randLangKey});
      });
    });
    this.setState((state) => ({gameProcess: state.gameProcess + 1}));
  }

  render() {
    console.log(this.state.gameProcess + ": gameProcess");
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return ( 
      <div>
        <audio src="./hurroo.mp3">trying to render audio</audio>
        <Inputfield 
          transable={this.translateText} 
        />
        <TranslatedString 
         printableTranslation={this.state.resultText}
        />
        <AnswerButtonList
          numbers={numbers}
          label={importantLangTable} 
          checkAnswer={this.checkAnswer}
        />
        <ConclusionMessage 
         label={this.state.AnswerMessage}
        />

        <PlayerRender 
        gameProcess={this.state.gameProcess}
        />
      </div>
    );
  }
}

export default App;