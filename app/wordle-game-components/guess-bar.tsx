import { useState } from "react";

export function GuessBar({ onGuess, gameWon }) {
    function handleSubmit(event) {
        const guess = event.target.childNodes[0].value;
        if (guess.length == 5) {
            onGuess(guess);
        }
        event.preventDefault();
    }

    return (
        <div className="guess-bar">
            <form onSubmit={handleSubmit}>
                <input id="guess" type="text" maxLength={5} disabled={gameWon === true || gameWon == false} />
            </form>
        </div>
    );
}
