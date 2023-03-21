import React from "react";

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59e391" : "#fff",
  };
  let dice;
  switch (props.value) {
    case 1:
      dice = (
        <div className="dice one">
          <span className="dot"></span>
        </div>
      );
      break;
    case 2:
      dice = (
        <div className=" dice two">
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      );
      break;
    case 3:
      dice = (
        <div className="dice three">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      );
      break;
    case 4:
      dice = (
        <div className="dice four">
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
        <div className="dice five">
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
        <div className="dice six">
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

  return (
    <div
      className={`dice-shell ${props.isHeld ? "locked" : "unlocked"}`}
      style={styles}
      onClick={props.holdDice}
    >
      {dice}
    </div>
  );
}
