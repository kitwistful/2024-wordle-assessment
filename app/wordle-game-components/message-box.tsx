import { GAME_VALIDATION_STATE } from "./game-validation-state";

function getMessage(gameValidationState, word: string, moveCount: number) {
    switch (gameValidationState) {
        case GAME_VALIDATION_STATE.NORMAL:
        case undefined:
            if (moveCount === 5) {
                return "One more try! Think hard!";
            }
            return "";

        case GAME_VALIDATION_STATE.IS_LOADING:
            return "Loading....";

        case GAME_VALIDATION_STATE.INVALID_WORD:
            return "Guesses must be a real word!";

        case GAME_VALIDATION_STATE.NOT_ENOUGH_LETTERS:
            return "Guesses must be five letters long!";

        case GAME_VALIDATION_STATE.GAME_WON:
            return (
                <>
                    You guessed <span className="message-box-word">{word}</span> in {moveCount} moves! Fantastic!
                </>
            );

        case GAME_VALIDATION_STATE.GAME_LOST:
            return "So close! Ran out of moves";

        case GAME_VALIDATION_STATE.ERROR:
            return "Sorry, there was some kind of error.";

        default:
            console.error('Unrecognized game state: "' + gameValidationState + '"');
            return "";
    }
}

export function MessageBox({ gameValidationState, word, moveCount }) {
    let message: any = getMessage(gameValidationState, word, moveCount);
    return <div id="wordle-message-box">{message}</div>;
}
