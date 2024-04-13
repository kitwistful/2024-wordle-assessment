import "./styles.css";
import { WordleGame } from "./wordle-game";

export default function Page() {
    return (
        <>
            <header>
                <h1 className="amatic-sc-bold">Wordle</h1>
            </header>
            <main>
                <div className="amatic-sc-regular">
                    <WordleGame />
                </div>
            </main>
        </>
    );
}
