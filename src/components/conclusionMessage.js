import React from 'react';
import './conclusionMessage.css';

function ConclusionMessage(props) {
  return (
    <div>
      {props.answer && (
        <h3 className="msg">You are correct</h3>
      )}
      {!props.answer && (
      <div>
        <h3 className="msg">You are wrong</h3>
      </div>
      )}
      <button id="play-again-button" onClick={props.resetGame}>Play again</button>
    </div>
  );
}

export default ConclusionMessage;