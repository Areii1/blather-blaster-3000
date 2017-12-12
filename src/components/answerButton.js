import React from 'react';
import './answerButton.css';

function AnswerButton(props) {
  return (
    <li className="buttonListElement">
      <button className="answer-button" onClick={() => {
        props.checkAnswer(props.label)
      }}>
      {props.label}
      </button>
    </li>
  );
}

export default AnswerButton;