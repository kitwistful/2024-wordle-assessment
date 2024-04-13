import "./styles.css";
import { WordleGrid } from "./game-components/wordle";
import { MessageBox } from "./game-components/message-box";
import { GuessBar } from "./game-components/guess-bar";

export default function Page() {
    return (
        <>
            <header>
                <h1>Wordle</h1>
            </header>
            <main>
                <WordleGrid />
                <GuessBar />
                <MessageBox success={true} word="WORDS" />
            </main>
        </>
    );
}
