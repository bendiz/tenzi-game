import { React, useState, useEffect } from "react";
import "./App.css";
import Die from "./components/Die";
import Modal from "./components/Modal";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [diceRolls, setDiceRolls] = useState(0);
  const [bestRound, setBestRound] = useState(
    localStorage.getItem("best") || null
  );
  const [activeGame, setActiveGame] = useState(false);
  const [modal, setModal] = useState(false);

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
    setActiveGame(true);
    setDiceRolls((prevRolls) => prevRolls + 1);
    // Checks if game has already been won
    if (tenzi) {
      restartGame();
    } else {
      setDiceValues(
        diceValues.map((die) => {
          return die.isHeld ? die : generateNumber();
        })
      );
    }
  };

  const restartGame = () => {
    setDiceRolls(0);
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

  const calculateBestRound = () => {
    if (diceRolls <= bestRound || !bestRound) {
      setBestRound(diceRolls);
      localStorage.setItem("best", bestRound);
    }
  };

  const toggleModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
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
        calculateBestRound();
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
      <div>
        <h1>Tenzi</h1>
        <span className="game-info" onClick={toggleModal}>
          ⓘ
        </span>
      </div>
      {modal && <Modal closeModal={() => closeModal()} />}
      <div className="dice-container">{dice}</div>
      <button onClick={rollDice}>{tenzi ? "Reset" : "Roll"}</button>
      {tenzi && <Confetti />}
      <p>Number of rolls: {diceRolls}</p>
      {bestRound ? <p>Best round: {bestRound}</p> : ""}
    </main>
  );
}

export default App;
