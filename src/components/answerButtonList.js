import React from 'react';
import AnswerButton from './answerButton';

function AnswerButtonList(props) {

    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
        <AnswerButton
          key={number}
          label={props.label[number]}
          checkAnswer={props.checkAnswer}
          number={number}
        />
    );

    return (
      <div>
        {listItems}
      </div>
    );
  }

export default AnswerButtonList;