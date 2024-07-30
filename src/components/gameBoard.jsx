import React from "react";
import "./gameBoard.css";


export default function GameBoard({onSelectedSquare , board}) {
  

  return (
    <ol className="game-board">
      {board.map((row, rowIndx) => (
        <li key={rowIndx}>
          <ol>
            {row.map((col, colIndx) => (
              <li key={colIndx}>
                <button onClick={() => onSelectedSquare(rowIndx, colIndx)} disabled = {col != null}>
                  {col}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
