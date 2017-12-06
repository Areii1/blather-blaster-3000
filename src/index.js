import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YandexTranslate from 'yandex-translate';

import Inputfield from './components/inputField';
import AnswerButton from './components/answerButton';
import ConclusionMessage from './components/conclusionMessage';
import TranslatedString from './components/translatedString';

import apiKey from './api-key';

const yandexInstance = YandexTranslate(apiKey);

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      gameprocess: 0,
      translatedText : '',
      textFieldValueSubmitted: '',
      resultText: ""
    }

    this.translateText = this.translateText.bind(this);
    this.joku = this.joku.bind(this);    
  }

  translateText() {
    console.log("joku", this);
    yandexInstance.translate(this.state.textFieldValueSubmitted, { to: 'fi' }, (err, res) => {
      console.log("sisällätrans", this)
      console.log(res.text);
      this.setState({resultText: res.text});
      console.log("resultText: ", this.state.resultText);
    });
  }

  joku(para) {
    this.setState({textFieldValueSubmitted: para});
    console.log("jokun sisällä", this.state.textFieldValueSubmitted);
    this.translateText();
  }
      
  render() {
    return ( 
      <div>
        <Inputfield jokus={this.joku}/>
        <TranslatedString transStr={this.state.resultText}/>
        <AnswerButton label="korean" />
        <AnswerButton label="english" />
        <AnswerButton label="finnish" />
        <AnswerButton label="portuguese" />
        <AnswerButton label="swedish" />
        <ConclusionMessage label="You answered correctly" />
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
