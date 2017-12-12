import React from 'react';
import AnswerButton from './answerButton';

import './answerButtonList.css';

function AnswerButtonList(props) {
  const listItems = props.optionsList.map((key) =>
    <AnswerButton 
      key={key}
      label={props.languageInformation[key].name}
      checkAnswer={props.checkAnswer}
    />
  );
  return (
    <div id="answers-wrapper">
        {props.showSpinner && (
          <p className="list-msg">loading</p>
        )}
        {!props.showSpinner && (
          <p className="list-msg">What language did we just hear?</p>
        )}
      <div id="list-wrapper">
        {listItems}
      </div>
    </div>
  );
}

export default AnswerButtonList;