import React, { useState, useEffect } from 'react';
import PlayAgain from './PlayAgain';
import NumberDisplay from './NumberDisplay';
import StarDisplay from './StarDisplay';
import utils from '../math-utils';

//Custom Hook: use 开头
//Rule of hooks: do not call hooks inside loop or conditions
const useGameStates = () => {
  const [stars, setStars] = useState(utils.random(1, 9));
  //判断数字是哪种状态，在UI上显示相应的颜色
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(15);

  //setTimeout设置间隔(side effect)
  useEffect(() => {
    if (secondsLeft > 0 && availableNums.length > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  });

  const setGameState = (newCadidateNums) => {
    if (utils.sum(newCadidateNums) !== stars) {
      setCandidateNums(newCadidateNums);
    } else {
      const newAvailableNums = availableNums.filter(
        (n) => !newCadidateNums.includes(n)
      );
      setStars(utils.randomSumIn(newAvailableNums, 9));
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }
  };

  return { stars, availableNums, candidateNums, secondsLeft, setGameState };
};

const Game = (props) => {
  //1) managing state: including: 1,initializing value on the state; 2,setting value on the state 3,computation based on values from the state; 4, rendering UI based on computation and state
  const {
    stars,
    availableNums,
    candidateNums,
    secondsLeft,
    setGameState,
  } = useGameStates();

  const candidatesAreWrong = utils.sum(candidateNums) > stars; //return true/false
  // const gameStatus = () => {
  //   if(availableNums.length === 0){
  //     return "won";
  //   }
  //   if(secondsLeft === 0){
  //     return "lost";
  //   }
  //   return "active";
  // }
  const gameStatus =
    availableNums.length === 0 ? 'won' : secondsLeft === 0 ? 'lost' : 'active';
  console.log(gameStatus);

  const numberStatus = (number) => {
    if (!availableNums.includes(number)) {
      return 'used';
    }
    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? 'wrong' : 'candidate'; //if syntax
    }
    return 'available';
  };

  //onNumberClick Function (Behavior Function) 随着点击改变数字的status
  const onNumberClick = (number, currentStatus) => {
    //console.log(currentStatus)
    //currentStatus => newStatus
    //点过的或者输了都不能再点了
    if (currentStatus == 'used' || secondsLeft === 0) {
      return;
    }

    //逻辑：只有当当前status为avalible的时候，加入newCadidateArray，其余status，移出
    const newCadidateNums =
      //candidateNums.concat(number);
      currentStatus === 'available'
        ? candidateNums.concat(number)
        : candidateNums.filter((cn) => cn !== number);
    //console.log(newCadidateNums)

    setGameState(newCadidateNums);
  };

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus != 'active' ? (
            <PlayAgain onClick={props.playAgain} gameStatus={gameStatus} />
          ) : (
            <StarDisplay stars={stars} />
          )}
        </div>
        <div className="right">
          {utils.range(1, 9).map((number) => (
            <NumberDisplay
              key={number}
              status={numberStatus(number)} //function return status
              number={number}
              onClick={onNumberClick}
            />
          ))}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
};

export default Game;
