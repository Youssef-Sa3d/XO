import React from "react";
import './gameOver.css'

export default function GameOver({ winner , onClick }) {
  return (
    <div className="game-over">
          <h2>Game Over</h2>
          {winner ? <p>{winner} won!</p> : <p>Draw!</p>}
          <button onClick={onClick}>Rematch</button>
    </div>
  );
}
