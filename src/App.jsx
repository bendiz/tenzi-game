import { React, useState, useEffect } from 'react';
import './App.css';
import Die from './components/Die';

function App() {
  const generateNumbers = () => {
    const randomDiceValues = [];
    for (let i = 0; i < 10; i++) {
      randomDiceValues.push(Math.floor(Math.random() * 6 + 1));
    }
    return randomDiceValues;
  };

  const [diceValues, setDiceValues] = useState(generateNumbers());
  const dice = diceValues.map((die) => <Die value={die} />);

  return (
    <main className="App">
      <div className="dice-container">{dice}</div>
    </main>
  );
}

export default App;
