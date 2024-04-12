const SCORE_CLASS_MAP = ["score-wrong", "score-half-correct", "score-correct"];

function WordleCell({ letter, score }: any) {
    let scoreClass = score === null ? "" : " " + SCORE_CLASS_MAP[score];
    return <div className={"wordle-cell" + scoreClass}>{letter}</div>;
}

function WordleRow({ wordScores, isActive }: any) {
    // TODO: There's gotta be a better way to do this....
    const letterloop = [0, 1, 2, 3, 4];
    const word = wordScores === null ? "     " : wordScores[0];
    const scores = wordScores === null ? [null, null, null, null, null] : wordScores[1];
    return (
        <div className={"wordle-row" + (isActive ? " active-row" : "")}>
            {letterloop.map((ch, i) => (
                <WordleCell letter={word.charAt(ch)} score={scores[i]} />
            ))}
        </div>
    );
}

export function WordleGrid() {
    let words = [
        ["SORTA", [1, 2, 2, 0, 0]],
        ["GUESS", [0, 0, 0, 0, 2]],
        ["WORDS", [2, 2, 2, 2, 2]],
    ];
    return (
        <div className="wordle-grid">
            {[0, 1, 2, 3, 4].map((i) => (
                <WordleRow wordScores={i < words.length ? words[i] : null} isActive={i < words.length} />
            ))}
        </div>
    );
}
