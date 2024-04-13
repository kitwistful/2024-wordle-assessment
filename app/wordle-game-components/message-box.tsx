export function MessageBox({ gameWon, word = null, moveCount = null }) {
    return gameWon === true ? (
        <div id="wordle-message-box">
            <div id="you-won">
                You guessed <span className="message-box-word">{word}</span> in {moveCount} moves! Fantastic!
            </div>
        </div>
    ) : gameWon === false ? (
        <div id="wordle-message-box">
            <div id="you-lost">So close! Ran out of moves.</div>
        </div>
    ) : moveCount == 5 ? (
        <div id="wordle-message-box">
            <div id="fifth-move">One more try! Think hard!</div>
        </div>
    ) : (
        <div id="wordle-message-box"></div>
    );
}
