import { Game } from "./features/Game";

function App() {
  return (
    <div className="w-screen h-screen bg-slate-100 grid place-items-center">
      <main className="w-3/4 h-4/5 bg-white rounded shadow-xl p-2">
        <Game />
      </main>
    </div>
  );
}

export default App;
