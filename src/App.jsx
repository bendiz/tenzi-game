import { React, useState, useEffect } from 'react';
import './App.css';
import Die from './components/Die';
import { nanoid } from 'nanoid';

function App() {
  const generateNumbers = () => {
    const randomDiceValues = [];
    for (let i = 0; i < 10; i++) {
      randomDiceValues.push({
        value: Math.floor(Math.random() * 6 + 1),
        isHeld: false,
        id: nanoid(),
      });
    }
    return randomDiceValues;
  };

  generateNumbers();

  const rollDice = (e) => {
    e.preventDefault();
    setDiceValues(generateNumbers);
  };

  const holdDice = (id) => {
    setDiceValues(
      diceValues.map((die) => {
        if (die.id === id) {
          die.isHeld = !die.isHeld;
        }
        return die;
      })
    );
  };

  const [diceValues, setDiceValues] = useState(generateNumbers());

  const dice = diceValues.map((die) => (
    <Die
      value={die.value}
      key={die.id}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main className="App">
      <div className="dice-container">{dice}</div>
      <button onClick={rollDice}>Roll</button>
    </main>
  );
}

export default App;
