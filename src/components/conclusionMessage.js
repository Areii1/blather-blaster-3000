import React from 'react';

function ConclusionMessage(props) {
  return (
    <div>
      {props.answer && (
        <h3>You are correct</h3>
      )}
      {!props.answer && (
      <div>
        <h3>You are wrong</h3>
        <p>that was {props.rightAnswerName} actually :) </p>
      </div>
      )}
      <button onClick={props.resetGame}>Play again</button>
    </div>
  );
}

export default ConclusionMessage;