import { SCORE_CLASS_MAP } from "./shared";

function GuessedLetter({ letter, score }) {
    return <div className={"guessed-letter " + SCORE_CLASS_MAP[score]}>{letter}</div>;
}
export function GuessedLetters({ letters }) {
    return (
        <div>
            {letters.map((letter, i) => (
                <GuessedLetter key={"guessed-letter-" + i} letter={letter[0]} score={letter[1]} />
            ))}
        </div>
    );
}
