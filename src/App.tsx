import { Game } from "./features/Game";

function App() {
  return (
    <div className="w-screen h-screen bg-zinc-900 grid place-items-center">
      <main className="w-3/4 h-4/5 bg-zinc-800 rounded shadow-xl p-5">
        <Game />
      </main>
    </div>
  );
}

export default App;
