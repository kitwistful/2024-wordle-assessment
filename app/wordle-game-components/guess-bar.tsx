import { useState } from "react";
import { GAME_VALIDATION_STATE } from "./game-validation-state";

export function GuessBar({ onGuess, gameValidationState, setGameValidationState }) {
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
        const textInput = event.target.childNodes[0];
        if (gameValidationState !== GAME_VALIDATION_STATE.IS_LOADING) {
            const guess = textInput.value;
            if (validateGuess(guess)) {
                onGuess(guess);
            } else {
                setGameValidationState(GAME_VALIDATION_STATE.NOT_ENOUGH_LETTERS);
            }
        }
        textInput.value = "";
        event.preventDefault();
    }

    function handleInputChange() {
        setIsValid(true);
    }

    function checkDisabled() {
        switch (gameValidationState) {
            case GAME_VALIDATION_STATE.GAME_WON:
            case GAME_VALIDATION_STATE.GAME_LOST:
                return true;

            default:
                break;
        }
        return false;
    }

    return (
        <div className="guess-bar">
            <form onSubmit={handleSubmit}>
                <input
                    id="guess"
                    onChange={handleInputChange}
                    type="text"
                    maxLength={5}
                    disabled={checkDisabled()}
                    className={isValid ? "" : " invalid-guess"}
                />
            </form>
        </div>
    );
}
