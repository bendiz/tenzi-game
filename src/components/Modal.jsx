import { React, useState, useEffect } from "react";
export default function Modal(props) {
  return (
    <div className={`info-popup-backdrop Modal`} onClick={props.closeModal}>
      <div className="tooltip">
        <span className="x" onClick={props.closeModal}>
          x
        </span>
        <h2>🎲 Tenzi Rules</h2>
        <p>
          The objective of the game is to get all dice to the same number. Click
          each die to freeze it at its current value between rolls. It's very
          important to scream TENZI from the top of your lungs if you win.{" "}
          <br />
          <br />
          <em>Good luck and have fun!</em>
        </p>
      </div>
    </div>
  );
}
