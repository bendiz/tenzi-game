import { React, useState, useEffect } from "react";
import "./App.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  // Generates a single number
  const generateNumber = () => {
    let newObject = {
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
      id: nanoid(),
    };
    return newObject;
  };

  // Generates an array of numbers
  const generateNumbers = () => {
    const randomDiceValues = [];
    for (let i = 0; i < 10; i++) {
      randomDiceValues.push(generateNumber());
    }
    return randomDiceValues;
  };

  // Sets new dice values to a random number if the dice is not held
  const rollDice = (e) => {
    e.preventDefault();
    // Checks if game has already been won
    if (tenzi) {
      restartGame();
    } else {
      setDiceValues(
        diceValues.map((die) => {
          return die.isHeld === true ? die : generateNumber();
        })
      );
    }
  };

  const restartGame = () => {
    setTenzi(false);
    setDiceValues(generateNumbers());
  };

  // Toggles the dice being held / not held
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
  const [tenzi, setTenzi] = useState(false);

  useEffect(() => {
    let heldDice = diceValues.every((die) => die.isHeld);
    if (heldDice) {
      const sameValueCheck = diceValues.every(
        (die) => die.value === diceValues[0].value
      );
      if (sameValueCheck) {
        setTenzi(true);
      }
    }
  }, [diceValues]);

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
      <h1>Tenzi</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{dice}</div>
      <button onClick={rollDice}>{!tenzi ? "Roll" : "Reset"}</button>
      {tenzi && <Confetti />}
    </main>
  );
}

export default App;
