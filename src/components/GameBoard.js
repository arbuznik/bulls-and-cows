import React, { useEffect, useState } from "react";
import chevronImage from '../images/chevron.forward.svg';
import PlayerNumber from './PlayerNumber.js';
import GameStatus from './GameStatus.js';

function GameBoard() {
  const [guessedNumberStr, setGuessedNumberStr] = useState(generateNumberOfRandomLength());
  const [digitArrays, setDigitArrays] = useState([]);
  const [guessAttempts, setGuessAttempts] = useState(4);
  const [hasPlayerWon, setHasPlayerWon] = useState(false);
  const [inputValue, setInputValue] = useState('');

  function generateNumberInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function generateNumberOfRandomLength() {
    const randomNumberLength = generateNumberInclusive(3, 6);
    let number = [];
    while (number.length < randomNumberLength) {
      const newDigit = generateNumberInclusive(0, 9);
      if (!number.includes(newDigit)) {
        number.push(newDigit);
      }
    }
    return number.join('');
  }

  function handlePlayerAnswer(evt) {
    evt.preventDefault();

    const playerNumberStr = evt.target.querySelector('.numberInput').value;
    const digitsArray = getDigitsArray(playerNumberStr, guessedNumberStr);
    setInputValue('');

    if (playerNumberStr === guessedNumberStr) {
      setHasPlayerWon(true);
    } else {
      setGuessAttempts(guessAttempts - 1);
    }

    setDigitArrays([...digitArrays, digitsArray]);
  }

  function getDigitsArray(playerNumberStr, guessedNumberStr) {
    return playerNumberStr.split('').map((digit, index) => {
      let matchType = 'digit_match_none';
      if (digit === guessedNumberStr[index]) {
        matchType = 'digit_match_digit-and-position';
      } else if (guessedNumberStr.includes(digit)) {
        matchType = 'digit_match_digit';
      }
      
      return { value: digit, matchType: matchType};
    })
  }

  function startNewGame() {
    setGuessedNumberStr(generateNumberOfRandomLength());
    setDigitArrays([]);
    setGuessAttempts(4);
    setHasPlayerWon(false);
    setInputValue('');
  }

  function allowOnlyDigits(evt) {
    setInputValue(evt.target.value.replace(/[^0-9]/g, ''));
  }

  return (
    <>
      <p>I have a number in my mind. Dare to guess it?</p>
      <div className="game-content">
        <p className="guessedNumber">{guessedNumberStr.split('').map(n => '*')}</p>
        <div className="playerNumbers">{digitArrays.map((playerNumber, index) => {
          return <PlayerNumber key={index} playerNumber={playerNumber} />
        })}</div>
        <img src={chevronImage} alt="chevron" className={`chevron ${(guessAttempts === 0 || hasPlayerWon) && 'hidden'}`} />
        <form className="playerNumberForm" onSubmit={handlePlayerAnswer}>
          <input autoFocus type="text" className={`numberInput ${(guessAttempts === 0 || hasPlayerWon) && 'hidden'}`} onChange={allowOnlyDigits} value={inputValue} minLength={guessedNumberStr.length} maxLength={guessedNumberStr.length} required/>
        </form>
      </div>
      <GameStatus playerWon={hasPlayerWon} guessAttempts={guessAttempts} />
      <button className="button" onClick={startNewGame}>New game</button>
      <div className="gameDescription">
        <p>Hidden number has random length of 3 to 6 digits, digits are all different. <span className="digit_match_digit">Orange digit</span> is a match (cow). <span className="digit_match_digit-and-position">Green digit</span> is a match and at correct position (bull).</p>
      </div>
    </>
  )
}

export default GameBoard;