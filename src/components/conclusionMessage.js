import React from 'react';
import './conclusionMessage.css';
import knowxvilleLaugh from '../media/knoxville_laugh.mp3';
import noyryytys from '../media/noyryytys.mp3';
import vitunVittu from '../media/vitunvittu.mp3';

export function ConclusionMessage(props) {
  return (
    <div id="concl-wrapper">
      {props.answer && (
        <p className="msg">You are correct</p>
      )}
      {!props.answer && (
      <div>
        <p className="msg">You are wrong</p>
      </div>
      )}
      {props.mistakesInARow === 3 && (
        <div>
          <p className="msg">Three mistakes in a row!</p>
          <audio autoPlay="autoPlay" src={vitunVittu}></audio>
        </div>
      )}
      {props.mistakesInARow === 5 && (
        <div>
          <p className="msg">Five mistakes in a row, HAHHAHAHAH</p>
          <audio autoPlay="autoPlay" src={knowxvilleLaugh}></audio>
        </div>
      )}
      {props.mistakesInARow === 7 && (
        <div>
          <p className="msg">Seven mistakes in a row, you have brought shame to all human kind</p>
          <audio autoPlay="autoPlay" src={noyryytys}></audio>
        </div>
      )}
  
      <button id="play-again-button" onClick={props.resetGame}>Play again</button>
    </div>
  );
}