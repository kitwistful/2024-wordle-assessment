"use client";

import { useState, useEffect } from "react";
import $ from "jquery";
import { WordleGrid } from "./wordle-game-components/wordle-grid";
import { MessageBox } from "./wordle-game-components/message-box";
import { GuessBar } from "./wordle-game-components/guess-bar";
import { GuessedLetters } from "./wordle-game-components/guessed-letters";
import { GAME_VALIDATION_STATE } from "./wordle-game-components/shared";

export function WordleGame() {
    const [finalWord, setfinalWord] = useState("");
    const [wordGrid, setWordGrid] = useState([]);
    const [moveCount, setMoveCount] = useState(0);
    const [gameValidationState, setGameValidationState] = useState(GAME_VALIDATION_STATE.NORMAL as any);
    const [isInitializing, setIsInitializing] = useState(true);
    const [guessedLetters, setGuessedLetters] = useState([]);

    useEffect(() => {
        setIsInitializing(false);
    });

    function processGuess(guess, score) {
        const newRow = [guess, score];

        // update guessed letters
        let updatedGuessedLetters = [...guessedLetters];
        for (let i = 0; i < 5; i++) {
            // Add a letter if it hasn't been discovered yet.
            let guess_ch = guess[i].toUpperCase();
            let guess_id = updatedGuessedLetters.findIndex((v) => v[0] === guess_ch);
            if (guess_id > -1) {
                if (score[i] > updatedGuessedLetters[guess_id][1]) {
                    updatedGuessedLetters[guess_id] = [guess_ch, score[i]];
                }
            } else {
                updatedGuessedLetters.push([guess_ch, score[i]]);
            }
        }
        updatedGuessedLetters.sort((a, b) => {
            if (a === b) {
                return 0;
            } else if (a[1] == b[1]) {
                return a[0] == b[0] ? 0 : a[0] < b[0] ? -1 : 1;
            }
            return a[1] == b[1] ? 0 : a[1] < b[1] ? 1 : -1;
        });
        setGuessedLetters(updatedGuessedLetters);

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
        setGameValidationState(GAME_VALIDATION_STATE.IS_LOADING);
        $.post(
            "https://wordle-apis.vercel.app/api/validate",
            {
                guess: guess,
            },
            (results) => {
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

    if (isInitializing) {
        return <div className="wordle-fade-in">Loading...</div>;
    } else {
        return (
            <div className="wordle-game">
                <WordleGrid wordGrid={wordGrid} />
                <GuessBar
                    onGuess={onGuess}
                    gameValidationState={gameValidationState}
                    setGameValidationState={setGameValidationState}
                />
                <MessageBox gameValidationState={gameValidationState} word={finalWord} moveCount={moveCount} />
                <GuessedLetters letters={guessedLetters} />
            </div>
        );
    }
}
