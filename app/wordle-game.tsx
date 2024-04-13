"use client";

import { useState } from "react";
import $ from "jquery";
import { WordleGrid } from "./wordle-game-components/wordle-grid";
import { MessageBox } from "./wordle-game-components/message-box";
import { GuessBar } from "./wordle-game-components/guess-bar";

export function WordleGame() {
    const [gameWon, setGameWon] = useState(null);
    const [finalWord, setfinalWord] = useState("");
    const [wordGrid, setWordGrid] = useState([]);
    const [moveCount, setMoveCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    function processGuess(guess, score) {
        // TODO: find and kill all console logs
        console.log("processing guess");
        const newRow = [guess, score];

        // update word grid
        const updatedGrid = [...wordGrid];
        updatedGrid.push(newRow);
        if (updatedGrid.length <= 6) {
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

    function onGuess(guess) {
        // make API call
        // TODO: fix this
        console.log("calling endpoint");
        setIsLoading(true);
        $.post(
            "https://wordle-apis.vercel.app/api/validate",
            {
                guess: guess,
            },
            (results) => {
                console.log(results);
                if (results["is_valid_word"]) {
                    processGuess(guess, results["score"]);
                }
            }
        ).always(() => {
            setIsLoading(false);
        });
    }

    // const []
    return (
        <div id="wordle-game">
            <WordleGrid wordGrid={wordGrid} />
            <GuessBar onGuess={onGuess} gameWon={gameWon} isLoading={isLoading} />
            <MessageBox gameWon={gameWon} word={finalWord} moveCount={moveCount} />
        </div>
    );
}
