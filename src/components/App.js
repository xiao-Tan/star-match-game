import React, { useState } from 'react';
import Game from './Game';

const StarMatch = () => {
  const [gameId, setGameId] = useState(1);
  return <Game key={gameId} playAgain={() => setGameId(gameId + 1)} />;
};

export default StarMatch;
