import { React, useState } from "react";
import "./App.css";
import Die from "./components/Die";

function App() {
  const { dieValue, setDieValue } = useState(1);
  return (
    <main className="App">
      <div className="row">
        <Die value={dieValue} />
        <Die value={dieValue} />
        <Die value={dieValue} />
        <Die value={dieValue} />
        <Die value={dieValue} />
      </div>
      <div className="row">
        <Die value={dieValue} />
        <Die value={dieValue} />
        <Die value={dieValue} />
        <Die value={dieValue} />
        <Die value={dieValue} />
      </div>
    </main>
  );
}

export default App;
