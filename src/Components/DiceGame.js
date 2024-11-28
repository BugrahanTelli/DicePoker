import React, { useState } from 'react';
import '../App.css';

const getDiceCombination = (dice) => {
    const diceCount = new Array(6).fill(0);
    dice.forEach(die => diceCount[die - 1]++);

    if (diceCount.includes(5)) {
        return "Five of a Kind";
    }
    if (diceCount.includes(4)) {
        return "Four of a Kind";
    }

    const threeOfAKind = diceCount.filter(count => count === 3).length;
    const onePair = diceCount.filter(count => count === 2).length;

    if (threeOfAKind === 1 && onePair === 1) {
        return "Full House";
    }
    if (threeOfAKind === 1) {
        return "Three of a Kind";
    }
    if (onePair === 2) {
        return "Two Pairs";
    }
    if (onePair === 1) {
        return "One Pair";
    }

    const highStraight = [2, 3, 4, 5, 6];
    const lowStraight = [1, 2, 3, 4, 5];

    if (highStraight.every(value => dice.includes(value))) {
        return "High Straight";
    }
    if (lowStraight.every(value => dice.includes(value))) {
        return "Low Straight";
    }

    return "Nothing";
};
// Kazananı belirleyen fonksiyon
export const getWinner = (player1Dice, player2Dice) => {
    const player1Combination = getDiceCombination(player1Dice);
    const player2Combination = getDiceCombination(player2Dice);
    
    console.log("Player 1 Combination: ", player1Combination); // Debugging line
    console.log("Player 2 Combination: ", player2Combination); // Debugging line

    const rankings = [
        "Five of a Kind",
        "Four of a Kind",
        "Full House",
        "High Straight",
        "Low Straight",
        "Three of a Kind",
        "Two Pairs",
        "One Pair",
        "Nothing"
    ];

    const player1Rank = rankings.indexOf(player1Combination);
    const player2Rank = rankings.indexOf(player2Combination);

    if (player1Rank === -1 || player2Rank === -1) {
        return "Invalid dice combination detected!";
    }

    if (player1Rank < player2Rank) {
        return "Player 1 wins!";
    } else if (player1Rank > player2Rank) {
        return "Player 2 wins!";
    } else {
        return "It's a tie!";
    }
};

const DiceGame = ({ player1Dice, player2Dice }) => {
    const [winner, setWinner] = useState("");
    const [player1Combination, setPlayer1Combination] = useState("");
    const [player2Combination, setPlayer2Combination] = useState("");

    return (
        <div>
            {player1Combination && <h2>Player 1: {player1Combination}</h2>}
            {winner && <h2>{winner}</h2>}
            {player2Combination && <h2>Player 2: {player2Combination}</h2>}
        </div>
    );
};

export default DiceGame;