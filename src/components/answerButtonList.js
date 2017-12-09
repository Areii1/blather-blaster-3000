import React, { Component } from 'react';
import AnswerButton from './answerButton';

class AnswerButtonList extends Component {
  constructor(props) {
    super(props);
  }


  listItems = this.props.optionsList.map((key) =>
      <AnswerButton 
      key={key}
      label={this.props.languageInformation[key].name}
      checkAnswer={this.props.checkAnswer}
      />
    )
  
  render() {
    return (
      <div>
        {this.listItems}
      </div>
    );
  }
}

export default AnswerButtonList;