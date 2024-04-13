"use client";

import { useState } from "react";
import { WordleGrid } from "./wordle-game-components/wordle-grid";
import { MessageBox } from "./wordle-game-components/message-box";
import { GuessBar } from "./wordle-game-components/guess-bar";

export function WordleGame() {
    const [gameWon, setGameWon] = useState(null);
    const [finalWord, setfinalWord] = useState("");
    const [wordGrid, setWordGrid] = useState([]);
    const [moveCount, setMoveCount] = useState(0);

    function onGuess(guess) {
        // make API call
        // TODO: make API call
        const newRow = [guess, [1, 2, 2, 0, 0]];

        // update word grid
        const updatedGrid = [...wordGrid];
        updatedGrid.push(newRow);
        if (updatedGrid.length < 6) {
            setWordGrid(updatedGrid);
        }

        // update move count
        setMoveCount(updatedGrid.length);

        // Figure out if they won or not
        let wordIsCorrect = true;
        for (let i = 0; i < 5; i++) {
            if (newRow[1][i] < 2) {
                wordIsCorrect = false;
                break;
            }
        }
        if (wordIsCorrect || updatedGrid.length >= 6) {
            setGameWon(wordIsCorrect);
            setfinalWord(finalWord);
        }
    }

    // const []
    return (
        <div id="wordle-game">
            <WordleGrid wordGrid={wordGrid} />
            <GuessBar onGuess={onGuess} gameWon={gameWon} />
            <MessageBox gameWon={gameWon} word={finalWord} moveCount={moveCount} />
        </div>
    );
}
