import React from 'react';

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? '#59e391' : '#fff',
  };

  return (
    <div
      className={`Die ${props.isHeld ? 'locked' : 'unlocked'}`}
      style={styles}
      onClick={props.holdDice}
    >
      <h2>{props.value}</h2>
    </div>
  );
}
