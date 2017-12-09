import React, { Component } from 'react';
import AnswerButton from './answerButton';

function AnswerButtonList(props) {
  const keys = Object.keys(props.importantAnotherTable);
  const listItems = keys.map((key) =>
    <AnswerButton 
    key={key}
    label={props.importantAnotherTable[key].name}
    checkAnswer={props.checkAnswer}
    />
  )

  return (
    <div>
      {listItems}
    </div>
  );
}

export default AnswerButtonList;