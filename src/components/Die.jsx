import { React, useState } from "react";

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59e391" : "#fff",
  };
  let dice;
  let numbers = (
    <div
      className={`dice numbers ${props.isHeld ? "locked" : "unlocked"}`}
      style={styles}
      onClick={props.holdDice}
    >
      <span className="number-text">{props.value}</span>
    </div>
  );
  switch (props.value) {
    case 1:
      dice = (
        <div
          className={`dice one ${props.isHeld ? "locked" : "unlocked"}`}
          style={styles}
          onClick={props.holdDice}
        >
          <span className="dot"></span>
        </div>
      );
      break;
    case 2:
      dice = (
        <div
          className={`dice two ${props.isHeld ? "locked" : "unlocked"}`}
          style={styles}
          onClick={props.holdDice}
        >
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      );
      break;
    case 3:
      dice = (
        <div
          className={`dice three ${props.isHeld ? "locked" : "unlocked"}`}
          style={styles}
          onClick={props.holdDice}
        >
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      );
      break;
    case 4:
      dice = (
        <div
          className={`dice four ${props.isHeld ? "locked" : "unlocked"}`}
          style={styles}
          onClick={props.holdDice}
        >
          <div className="column">
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          <div className="column">
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      );
      break;
    case 5:
      dice = (
        <div
          className={`dice five ${props.isHeld ? "locked" : "unlocked"}`}
          style={styles}
          onClick={props.holdDice}
        >
          <div className="column">
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          <div className="column">
            <span className="dot"></span>
          </div>
          <div className="column">
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      );
      break;
    case 6:
      dice = (
        <div
          className={`dice six ${props.isHeld ? "locked" : "unlocked"}`}
          style={styles}
          onClick={props.holdDice}
        >
          <div className="column">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          <div className="column">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      );
      break;
  }

  return props.diceMode ? dice : numbers;
}
