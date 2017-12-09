import React from 'react';
import './answerButton.css';

function AnswerButton(props) {
  return (
    <button className="answerButton" onClick={() => {
      props.checkAnswer(props.label)
    }}>
    {props.label}
    </button>
  );
}

export default AnswerButton;