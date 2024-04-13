export function MessageBox({ success, word = null }) {
    return success === true ? (
        <div id="wordle-message-box">
            <div id="you-won">
                You guessed <span className="message-box-word">{word}</span> in x moves! Fantastic!
            </div>
        </div>
    ) : success === false ? (
        <div id="wordle-message-box">
            <div id="you-lost">
                So close! The word was <span className="message-box-word">{word}</span>!
            </div>
        </div>
    ) : (
        <div id="wordle-message-box"></div>
    );
}
