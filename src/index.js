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
}

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
      textFieldValueSubmitted: '',
      resultText: ""
    }

    this.translateText = this.translateText.bind(this); 
  }

  getRandomLang() {
    var randNum = (Math.floor(Math.random() * 10) + 1);
    var randLangKey = importantLangKeyTable[randNum];

    return randLangKey;
  }

  translateText(submittedText) {
    var randLangKey = this.getRandomLang();
    this.setState({textFieldValueSubmitted: submittedText}, () => {
      yandexInstance.translate(this.state.textFieldValueSubmitted, { to: randLangKey }, (err, res) => {
        this.setState({resultText: res.text});
        console.log(randLangKey);
      });
    });
  }
      
  render() {
    return ( 
      <div>
        <Inputfield transable={this.translateText}/>
        <TranslatedString printableTranslation={this.state.resultText}/>
        <AnswerButton label={importantLangTable[0]} />
        <AnswerButton label={importantLangTable[1]} />
        <AnswerButton label={importantLangTable[2]} />
        <AnswerButton label={importantLangTable[3]} />
        <AnswerButton label={importantLangTable[4]} />
        <AnswerButton label={importantLangTable[5]} />
        <AnswerButton label={importantLangTable[6]} />
        <AnswerButton label={importantLangTable[7]} />
        <AnswerButton label={importantLangTable[8]} />
        <AnswerButton label={importantLangTable[9]} />
        <AnswerButton label={importantLangTable[10]} />
        <ConclusionMessage label="You answered correctly" />
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
