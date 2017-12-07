import React, { Component } from 'react';

import AnswerButton from './answerButton';

class AnswerButtonList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <AnswerButton 
        label={this.props.label[0]} 
        checkAnswer={this.props.checkAnswer}
        id={0}
        />
        <AnswerButton 
        label={this.props.label[1]} 
        checkAnswer={this.props.checkAnswer}
        id={1}
        />
        <AnswerButton 
        label={this.props.label[2]} 
        checkAnswer={this.props.checkAnswer}
        id={2}
        />
        <AnswerButton 
        label={this.props.label[3]} 
        checkAnswer={this.props.checkAnswer}
        id={3}
        />
        <AnswerButton 
        label={this.props.label[4]} 
        checkAnswer={this.props.checkAnswer}
        id={4}
        />
        <AnswerButton 
        label={this.props.label[5]} 
        checkAnswer={this.props.checkAnswer}
        id={5}
        />
        <AnswerButton 
        label={this.props.label[6]} 
        checkAnswer={this.props.checkAnswer}
        id={6}
        />
        <AnswerButton 
        label={this.props.label[7]} 
        checkAnswer={this.props.checkAnswer}
        id={7}
        />
        <AnswerButton 
        label={this.props.label[8]} 
        checkAnswer={this.props.checkAnswer}
        id={8}
        />
        <AnswerButton 
        label={this.props.label[9]} 
        checkAnswer={this.props.checkAnswer}
        id={9}
        />
        <AnswerButton 
        label={this.props.label[10]} 
        checkAnswer={this.props.checkAnswer}
        id={10}
        />
      </div>
    );
  }
}

export default AnswerButtonList;