import { React } from "react";
export default function Scoreboard(props) {
  return (
    <div className={`info-popup-backdrop Scoreboard`} onClick={props.close}>
      <div className="tooltip">
        <span className="x" onClick={props.close}>
          x
        </span>
        <h2>🏆 Your achievements</h2>
        <br />
        <p>
          {props.bestRound
            ? `Your best round: ${props.bestRound} dice rolls`
            : "You haven't played yet! Check back in after you've played a round."}
          <br />
          {props.bestTime ? `Your best time: ${props.bestTime} seconds` : ""}
        </p>
      </div>
    </div>
  );
}
