import React, { useState } from "react";
import "./container.css";
import Player from "./player.jsx";
import GameBoard from "./gameBoard.jsx";
import GameOver from "./gameOver.jsx";
import { WINNING_COMBINATIONS } from "./winningSituation.js";



function activePlayer(turns) {
  let curPlayer = "X";
  if (turns.length > 0 && turns[0].player === "X") {
    curPlayer = "O";
  }
  return curPlayer;
}

const array = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function Container() {
  const [players, setPlayers] = useState({
    X: "Player 1",
    O: "Player 2",
  });

  const [turns, setTurns] = useState([]);

  const active = activePlayer(turns);

  let board = [...array.map((arr) => [...arr])];
  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;
    board[row][col] = player;
  }

  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = board[combination[0].row][combination[0].column];
    const secondSquare = board[combination[1].row][combination[1].column];
    const thirdSquare = board[combination[2].row][combination[2].column];

    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    ) {
      winner = players[firstSquare];
    }
  }

  const tie = turns.length === 9 && !winner;

  function handleSelectedSquare(rowIndx, colIndx) {
    setTurns((prevTurns) => {
      const curPlayer = activePlayer(prevTurns);
      const updateTurns = [
        { square: { row: rowIndx, col: colIndx }, player: curPlayer },
        ...prevTurns,
      ];
      return updateTurns;
    });
  }

  function handleRestart() {
    setTurns([]);
  }

  function handlePlayerName(s, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [s]: newName,
      };
    });
  }
  return (
    <>
      <main>
        <div className="box">
          <ol className="players-info">
            <Player
              name="Player 1"
              s="X"
              isActive={active === "X"}
              onChangeName={handlePlayerName}
            />
            <Player
              name="Player 2"
              s="O"
              isActive={active === "O"}
              onChangeName={handlePlayerName}
            />
          </ol>
          <GameBoard onSelectedSquare={handleSelectedSquare} board={board} />
        </div>
        {(winner || tie) && (
          <GameOver winner={winner} onClick={handleRestart} />
        )}
      </main>
    </>
  );
}
