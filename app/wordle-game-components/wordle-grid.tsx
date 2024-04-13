const SCORE_CLASS_MAP = ["score-wrong", "score-half-correct", "score-correct"];

function WordleCell({ letter, score }: any) {
    let scoreClass = score === null ? "" : " " + SCORE_CLASS_MAP[score];
    return <div className={"wordle-cell" + scoreClass}>{letter}</div>;
}

function WordleRow({ wordScores, isActive }: any) {
    // TODO: There's gotta be a better way to do this....
    const word = wordScores[0] || "     ";
    const scores = wordScores[1] || [null, null, null, null, null];
    return (
        <div className={"wordle-row" + (isActive ? " active-row" : "")}>
            {[0, 1, 2, 3, 4].map((ch, i) => (
                <WordleCell key={"wordle-cell-" + i} letter={word.charAt(ch)} score={scores[i]} />
            ))}
        </div>
    );
}

export function WordleGrid({ wordGrid }) {
    return (
        <div className="wordle-grid">
            {[0, 1, 2, 3, 4, 5].map((i) => (
                <WordleRow
                    key={"wordle-row-" + i}
                    wordScores={i < wordGrid.length ? wordGrid[i] : [null, null]}
                    isActive={i < wordGrid.length}
                />
            ))}
        </div>
    );
}
