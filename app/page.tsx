import "./styles.css";
import { WordleGame } from "./wordle-game";

export default function Page() {
    return (
        <>
            <header>
                <h1>Wordle</h1>
            </header>
            <main>
                <div>
                    <WordleGame />
                </div>
            </main>
        </>
    );
}
