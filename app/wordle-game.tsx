"use client";

import { useState } from "react";
import $ from "jquery";
import { WordleGrid } from "./wordle-game-components/wordle-grid";
import { MessageBox } from "./wordle-game-components/message-box";
import { GuessBar } from "./wordle-game-components/guess-bar";
import { GAME_VALIDATION_STATE } from "./wordle-game-components/game-validation-state";

export function WordleGame() {
    const [finalWord, setfinalWord] = useState("");
    const [wordGrid, setWordGrid] = useState([]);
    const [moveCount, setMoveCount] = useState(0);
    const [gameValidationState, setGameValidationState] = useState(GAME_VALIDATION_STATE.NORMAL as any);

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

        // Figure out if they won or `not`
        let wordIsCorrect = true;
        for (let i = 0; i < 5; i++) {
            if (newRow[1][i] < 2) {
                wordIsCorrect = false;
                break;
            }
        }
        if (wordIsCorrect || updatedGrid.length >= 6) {
            setfinalWord(finalWord);
            return wordIsCorrect ? GAME_VALIDATION_STATE.GAME_WON : GAME_VALIDATION_STATE.GAME_LOST;
        }
    }

    function onGuess(guess) {
        // make API call
        // TODO: fix this
        console.log("calling endpoint");
        setGameValidationState(GAME_VALIDATION_STATE.IS_LOADING);
        $.post(
            "https://wordle-apis.vercel.app/api/validate",
            {
                guess: guess,
            },
            (results) => {
                console.log(results);
                if (results["is_valid_word"]) {
                    setGameValidationState(processGuess(guess, results["score"]));
                } else {
                    setGameValidationState(GAME_VALIDATION_STATE.INVALID_WORD);
                }
            }
        ).fail(() => {
            setGameValidationState(GAME_VALIDATION_STATE.ERROR);
        });
    }

    // const []
    return (
        <div id="wordle-game">
            <WordleGrid wordGrid={wordGrid} />
            <GuessBar
                onGuess={onGuess}
                gameValidationState={gameValidationState}
                setGameValidationState={setGameValidationState}
            />
            <MessageBox gameValidationState={gameValidationState} word={finalWord} moveCount={moveCount} />
        </div>
    );
}
