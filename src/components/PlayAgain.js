import React from 'react';

const PlayAgain = (props) => {
  return (
    <div className="game-done">
      <div
        className="message"
        style={{ color: props.gameStatus === 'won' ? 'green' : 'red' }}
      >
        {props.gameStatus === 'won' ? 'Good job!' : 'Game over'}
      </div>
      <button onClick={props.onClick}>Play Again</button>
    </div>
  );
};

export default PlayAgain;
