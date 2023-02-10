import React, { useState } from "react";

const initialState = Array(9).fill(null);
const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const TicTacToe = () => {
  const [board, setBoard] = useState(initialState);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    let win = false;
    for (const combination of winCombinations) {
      if (combination.every((i) => newBoard[i] === currentPlayer)) {
        win = true;
        break;
      }
    }
    if (win) {
      setWinner(currentPlayer);
    } else if (!newBoard.includes(null)) {
      setWinner("tie");
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const restart = () => {
    setBoard(initialState);
    setCurrentPlayer("X");
    setWinner(null);
  };

  const renderSquare = (index) => (
    <div
      style={{
        width: "100px",
        height: "100px",
        border: "1px solid black",
        fontSize: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={() => handleClick(index)}
    >
      {board[index]}
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex" }}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div style={{ display: "flex" }}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div style={{ display: "flex" }}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div
        style={{
          marginTop: "20px",
          padding: "5px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {winner ? `Winner is: ${winner}` : `Current Player: ${currentPlayer}`}
        {winner ? (
          <button
            style={{
              padding: "5px 10px",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
            }}
            onClick={() => restart()}
          >
            Restart
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default TicTacToe;
