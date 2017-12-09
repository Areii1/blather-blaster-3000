import React, { Component } from 'react';
import AnswerButton from './answerButton';

class AnswerButtonList extends Component {

  render() {
    const listItems = this.props.optionsList.map((key) =>
      <AnswerButton 
        key={key}
        label={this.props.languageInformation[key].name}
        checkAnswer={this.props.checkAnswer}
      />
    )
    return (
      <div>
        {this.props.showSpinner && (
          <p>loading</p>
        )}
        {listItems}
      </div>
    );
  }
}

export default AnswerButtonList;