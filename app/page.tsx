import "./styles.css";
import { WordleGrid } from "./wordle.tsx";

export default function Page() {
    // TODO: create form & success message components
    return (
        <>
            <header>
                <h1>Wordle</h1>
            </header>
            <main>
                <WordleGrid />
                <div>
                    <form action="">
                        <label for="guess"></label>
                        <input id="guess" type="text" maxlength="5" />
                        <button>Enter</button>
                    </form>
                </div>
                <div id="you-won">You guessed YYYYY in x moves! Fantastic!</div>
                <div id="you-lost">So close! The word was YYYYY!</div>
            </main>
        </>
    );
}
