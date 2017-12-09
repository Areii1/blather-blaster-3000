import React, { Component } from 'react';

function AnswerButton(props) {
  return (
    <button onClick={() => {
      props.checkAnswer(props.label)
    }}>
    {props.label}
    </button>
  );
}

export default AnswerButton;