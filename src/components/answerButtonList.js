import React from 'react';
import AnswerButton from './answerButton';

function AnswerButtonList(props) {
  const listItems = props.optionsList.map((key) =>
    <AnswerButton 
      key={key}
      label={props.languageInformation[key].name}
      checkAnswer={props.checkAnswer}
    />
  );
  return (
    <div>
      {props.showSpinner && (
        <p>loading</p>
      )}
      {!props.showSpinner && (
        <p>What language did we just hear?</p>
      )}
      {listItems}
    </div>
  );
}

export default AnswerButtonList;