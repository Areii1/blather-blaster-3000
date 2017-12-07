import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YandexTranslate from 'yandex-translate';

import Inputfield from './components/inputField';
import AnswerButton from './components/answerButton';
import ConclusionMessage from './components/conclusionMessage';
import TranslatedString from './components/translatedString';

import apiKey from './api-key';

const importantLangList = {
  Japanese:	'ja',
  Esperanto:	'eo',
  Swedish:	'sv',
  Estonian:	'et',
  Latin:	'la',
  Finnish:	'fi',
  Chinese:	'zh',
  Greek:	'el',
  Russian:	'ru',
  German: 'de',
  Afrikaans: 'af',
};

const importantLangTable = ['Japanese', 'Esperanto', 'Swedish',
'Estonian', 'Latin', 'Finnish', 'Chinese', 'Greek',
 'Russian', 'German', 'Afrikaans'
];

const importantLangKeyTable = ['ja', 'eo', 'sv', 'et', 'la',
'fi', 'zh', 'el', 'ru', 'de', 'af'];

const yandexInstance = YandexTranslate(apiKey);

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      gameprocess: 0,
      textFieldValueSubmitted: "",
      resultText: "",
      rightAnswerKey: ""
    }

    this.translateText = this.translateText.bind(this);
    this.clicked = this.clicked.bind(this); 
  }

  getRandomLang() {
    var randNum = (Math.floor(Math.random() * 10) + 1);
    var randLangKey = importantLangKeyTable[randNum];

    return randLangKey;
  }

  clicked(buttonClicked) {
    console.log("click reached index");
    console.log("Right ANSWER: " + this.state.rightAnswerKey);

    if (importantLangKeyTable[buttonClicked] == this.state.rightAnswerKey) {
      console.log("answer was RIGHT");
    }
    else {
      console.log("answer was WRONG");
    }
  }

  translateText(submittedText) {
    console.log("submit reached index")
    var randLangKey = this.getRandomLang();
    this.setState({textFieldValueSubmitted: submittedText}, () => {
      yandexInstance.translate(this.state.textFieldValueSubmitted, { to: randLangKey }, (err, res) => {
        this.setState({resultText: res.text});
        this.setState({rightAnswerKey: randLangKey});
      });
    });
  }
      
  render() {
    return ( 
      <div>
        <Inputfield transable={this.translateText}/>
        <TranslatedString printableTranslation={this.state.resultText}/>
        <AnswerButton label={importantLangTable[0]} 
        id={0} clicked={this.clicked} />
        <AnswerButton label={importantLangTable[1]}
        id={1} clicked={this.clicked}/>
        <AnswerButton label={importantLangTable[2]}
        id={2} clicked={this.clicked}/>
        <AnswerButton label={importantLangTable[3]}
        id={3} clicked={this.clicked}/>
        <AnswerButton label={importantLangTable[4]}
        id={4} clicked={this.clicked}/>
        <AnswerButton label={importantLangTable[5]}
        id={5} clicked={this.clicked}/>
        <AnswerButton label={importantLangTable[6]}
        id={6} clicked={this.clicked}/>
        <AnswerButton label={importantLangTable[7]}
        id={7} clicked={this.clicked}/>
        <AnswerButton label={importantLangTable[8]}
        id={8} clicked={this.clicked}/>
        <AnswerButton label={importantLangTable[9]}
        id={9} clicked={this.clicked}/>
        <AnswerButton label={importantLangTable[10]}
        id={10} clicked={this.clicked}/>
        <ConclusionMessage label="You answered correctly" />
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
