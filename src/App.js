import './App.css';
import React, { useState } from 'react';
import rules from "./images/Poker Dice Rules.jpg";
import DiceGame from './Components/DiceGame'; 
import { getWinner } from './Components/DiceGame'; 

function App() {
  const totalDice = 5;
  const [player1Dice, setPlayer1Dice] = useState(new Array(totalDice).fill(1));
  const [player2Dice, setPlayer2Dice] = useState(new Array(totalDice).fill(1));
  const [selectedDicePlayer1, setSelectedDicePlayer1] = useState([]); 
  const [selectedDicePlayer2, setSelectedDicePlayer2] = useState([]); 
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [round, setRound] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [player1HasRolled, setPlayer1HasRolled] = useState(false);
  const [player2HasRolled, setPlayer2HasRolled] = useState(false);
  const [winner, setWinner] = useState(null); 

  const rollDice = () => {
    if (isRolling || (currentPlayer === 1 && player1HasRolled) || (currentPlayer === 2 && player2HasRolled)) {
      return;
    }

    setIsRolling(true);

    let newPlayer1Dice = [...player1Dice];
    let newPlayer2Dice = [...player2Dice];

    if (currentPlayer === 1) {
      newPlayer1Dice = newPlayer1Dice.map((die, index) => {
        if (selectedDicePlayer1.length === 0 || selectedDicePlayer1.includes(index)) {
          return Math.ceil(Math.random() * 6);
        }
        return die;
      });
      setPlayer1Dice(newPlayer1Dice);
      setPlayer1HasRolled(true);
    } else {
      newPlayer2Dice = newPlayer2Dice.map((die, index) => {
        if (selectedDicePlayer2.length === 0 || selectedDicePlayer2.includes(index)) {
          return Math.ceil(Math.random() * 6);
        }
        return die;
      });
      setPlayer2Dice(newPlayer2Dice);
      setPlayer2HasRolled(true);
    }

    setTimeout(() => {
      setIsRolling(false);
      endTurn();
    }, 1000);
  };

  const selectDice = (index) => {
    if (currentPlayer === 1 && (player1HasRolled || selectedDicePlayer1.length === totalDice)) {
      return; 
    }
    if (currentPlayer === 2 && (player2HasRolled || selectedDicePlayer2.length === totalDice)) {
      return; 
    }

    if (currentPlayer === 1) {
      setSelectedDicePlayer1((prev) => {
        if (prev.includes(index)) {
          return prev.filter((i) => i !== index);
        }
        return [...prev, index];
      });
    } else {
      setSelectedDicePlayer2((prev) => {
        if (prev.includes(index)) {
          return prev.filter((i) => i !== index);
        }
        return [...prev, index];
      });
    }
  };

  const endTurn = () => {
    setSelectedDicePlayer1([]);
    setSelectedDicePlayer2([]);
    setPlayer1HasRolled(false);
    setPlayer2HasRolled(false);
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    if (currentPlayer === 2) {
      roundEnd();
    }
  };

  const roundEnd = () => {
    if (round === 1) {
      setRound(2);
      setCurrentPlayer(1);
    } else {
      setRound(1);
    }

    if (round === 2) {
      const gameWinner = getWinner(player1Dice, player2Dice);
      setWinner(gameWinner);
    }
  };

  return (
    <div className="container">
      <div className="game">
        <img src={rules} alt="Poker Dice Rules" />
        <div className="dice-container">
          <h1>Round {round}</h1>
          <h2>{currentPlayer === 1 ? "Player 1's Turn" : "Player 2's Turn"}</h2>

          <h3>Player 1's Dice</h3>
          <div className="player1">
            {player1Dice.map((die, index) => (
              <button
                key={index}
                className={`dice ${selectedDicePlayer1.includes(index) ? "selected" : ""}`}
                onClick={() => selectDice(index)}
                disabled={player1HasRolled}
              >
                {die}
              </button>
            ))}
          </div>
          <button className="roll-btn" onClick={rollDice} disabled={isRolling}>
            {isRolling ? "Rolling..." : "Roll Dice"}
          </button>
          <button onClick={endTurn} className="okay-btn">Okay</button>
          <button className="reset-btn" onClick={() => window.location.reload()}>Restart</button>
          <h3>Player 2's Dice</h3>
          <div className="player2">
            {player2Dice.map((die, index) => (
              <button
                key={index}
                className={`dice ${selectedDicePlayer2.includes(index) ? "selected" : ""}`}
                onClick={() => selectDice(index)}
                disabled={player2HasRolled}
              >
                {die}
              </button>
            ))}
          </div>
        </div>

        <div className="result">
          {winner && <h2>{winner}</h2>}
        </div>

        <DiceGame player1Dice={player1Dice} player2Dice={player2Dice} />
      </div>
    </div>
  );
}

export default App;
