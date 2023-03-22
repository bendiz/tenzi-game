import { React, useState, useEffect } from "react";
import "./App.css";
import Die from "./components/Die";
import Modal from "./components/Modal";
import Scoreboard from "./components/Scoreboard";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

function App() {
  const [diceMode, setDiceMode] = useState(true);
  const [diceRolls, setDiceRolls] = useState(0);
  const [bestRound, setBestRound] = useState(
    window.localStorage.getItem("bestround") || false
  );
  const [activeGame, setActiveGame] = useState(false);
  const [modal, setModal] = useState(false);
  const [scoreboard, setScoreboard] = useState(false);
  const [timer, setTimer] = useState(null);
  const [bestTimer, setBestTimer] = useState(
    window.localStorage.getItem("bestTimer") || false
  );

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
    if (!activeGame) {
      setTimer(Date.now());
    }
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
    }
  };

  const toggleModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const checkBestTime = () => {
    const oldTimer = window.localStorage.getItem("bestTimer") || false;
    if (timer < oldTimer || !oldTimer) {
      setBestTimer(timer);
    }
  };

  const [diceValues, setDiceValues] = useState(generateNumbers());
  const [tenzi, setTenzi] = useState(false);

  useEffect(() => {
    if (tenzi) {
      window.localStorage.setItem("bestround", bestRound);
      checkBestTime();
    }
  }, [tenzi]);

  useEffect(() => {
    window.localStorage.setItem("bestTimer", bestTimer);
  }, [bestTimer]);

  useEffect(() => {
    let heldDice = diceValues.every((die) => die.isHeld);
    if (heldDice) {
      const sameValueCheck = diceValues.every(
        (die) => die.value === diceValues[0].value
      );
      if (sameValueCheck) {
        calculateBestRound();
        setTimer(((Date.now() - timer) / 1000).toFixed(2));
        setTenzi(true);
        setActiveGame(false);
      }
    }
  }, [diceValues]);

  const dice = diceValues.map((die) => (
    <Die
      value={die.value}
      key={die.id}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
      diceMode={diceMode}
    />
  ));

  const closeScoreboard = () => {
    setScoreboard(false);
  };

  const toggleScoreboard = () => {
    setScoreboard(true);
  };

  const toggleDiceGame = () => {
    setDiceMode(!diceMode);
    console.log("dice");
  };

  return (
    <main className="App">
      {tenzi && <Confetti />}
      <div>
        <h1>Tenzies</h1>
        <Tippy content={<span>View game rules</span>} className="tooltip-info">
          <span className="game-info" onClick={toggleModal}>
            ⓘ
          </span>
        </Tippy>
      </div>
      {diceRolls != 0 && <p>Number of rolls: {diceRolls}</p>}
      {tenzi && <p>That round took: {timer} seconds!</p>}
      {modal && <Modal closeModal={() => closeModal()} />}
      <div className="dice-container">{dice}</div>
      <button onClick={rollDice}>{tenzi ? "Reset" : "Roll"}</button>
      <div className="scoreboard">
        <div className="menu">
          <Tippy
            content={<span>View your scores!</span>}
            className="tooltip-info"
          >
            <FontAwesomeIcon
              onClick={toggleScoreboard}
              icon={faTrophy}
              style={{ color: "#FFD700" }}
              className="trophy-icon"
            />
          </Tippy>
          {scoreboard && (
            <Scoreboard
              close={() => closeScoreboard()}
              bestTime={bestTimer}
              bestRound={bestRound}
            />
          )}
          <Tippy
            content={<span>Switch to {diceMode ? "numbers" : "dice"}</span>}
            className="tooltip-info"
          >
            <label
              htmlFor="diceOrNumbers"
              className={diceMode ? "toggle-number" : "toggle-dice"}
            >
              <span role="img">
                {diceMode ? (
                  <img
                    src="src/assets/togglenum.png"
                    className="toggleNumImg"
                  />
                ) : (
                  <img
                    src="src/assets/toggledice.png"
                    className="toggleDiceNum"
                  />
                )}
              </span>
              <input
                type="checkbox"
                name="diceOrNumbers"
                id="diceOrNumbers"
                checked={diceMode}
                onChange={toggleDiceGame}
              ></input>
            </label>
          </Tippy>
        </div>
      </div>
    </main>
  );
}

export default App;
