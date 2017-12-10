import React from 'react';
import './conclusionMessage.css';
import knowxvilleLaugh from '../media/knoxville_laugh.mp3';
import noyryytys from '../media/noyryytys.mp3';
import vitunVittu from '../media/vitunvittu.mp3';

export function ConclusionMessage(props) {
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
      {props.mistakesInARow === 3 && (
        <div>
          <h3 className="msg">Three mistakes in a row!</h3>
          <audio autoPlay="autoPlay" src={vitunVittu}></audio>
        </div>
      )}
      {props.mistakesInARow === 5 && (
        <div>
          <h3 className="msg">Five mistakes in a row, HAHHAHAHAH</h3>
          <audio autoPlay="autoPlay" src={knowxvilleLaugh}></audio>
        </div>
      )}
      {props.mistakesInARow === 7 && (
        <div>
          <h3 className="msg">Seven mistakes in a row, you have brought shame to all human kind</h3>
          <audio autoPlay="autoPlay" src={noyryytys}></audio>
        </div>
      )}
  
      <button id="play-again-button" onClick={props.resetGame}>Play again</button>
    </div>
  );
}