import { useState } from "react";

export function GuessBar({ onGuess, gameWon, isLoading }) {
    const [isValid, setIsValid] = useState(true);
    const validation_re = /[a-zA-Z]{5}/;

    function validateGuess(guess) {
        // TODO: why isn't isValid getting updated?
        const passedValidation = validation_re.test(guess);
        setIsValid(passedValidation);
        console.log(guess + " " + passedValidation + " " + isValid);
        return passedValidation;
    }

    function handleSubmit(event) {
        const guess = event.target.childNodes[0].value;
        if (validateGuess(guess)) {
            onGuess(guess);
        }
        event.preventDefault();
    }

    function handleInputChange() {
        setIsValid(true);
    }

    return (
        <div className="guess-bar">
            <form onSubmit={handleSubmit}>
                <input
                    id="guess"
                    onChange={handleInputChange}
                    type="text"
                    maxLength={5}
                    disabled={gameWon === true || gameWon == false || isLoading}
                    className={isValid ? "" : "invalid-guess"}
                />
            </form>
        </div>
    );
}
