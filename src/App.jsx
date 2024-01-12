import { useState } from 'react';

/* eslint-disable react/prop-types */
// 0 1 2
// 3 4 5
// 6 7 8
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Square({ value, onSquareClick }) {
  return (
    <button
      onClick={onSquareClick}
      className="bg-white border border-gray-400 h-24 w-24 m-1 leading-9 text-5xl font-semibold"
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const updateSquare = (i) => {
    if (squares[i] || winner) return;

    const newSquares = [...squares];
    newSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(newSquares);
  };
  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner is: ${winner}`
    : `Next Player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <>
      <div className="text-lg font-bold m-1">{status}</div>
      <div className="flex">
        <Square value={squares[0]} onSquareClick={() => updateSquare(0)} />
        <Square value={squares[1]} onSquareClick={() => updateSquare(1)} />
        <Square value={squares[2]} onSquareClick={() => updateSquare(2)} />
      </div>
      <div className="flex">
        <Square value={squares[3]} onSquareClick={() => updateSquare(3)} />
        <Square value={squares[4]} onSquareClick={() => updateSquare(4)} />
        <Square value={squares[5]} onSquareClick={() => updateSquare(5)} />
      </div>
      <div className="flex">
        <Square value={squares[6]} onSquareClick={() => updateSquare(6)} />
        <Square value={squares[7]} onSquareClick={() => updateSquare(7)} />
        <Square value={squares[8]} onSquareClick={() => updateSquare(8)} />
      </div>
    </>
  );
}

function History({ history, onJump, currentMove }) {
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    return (
      <li className="text-lg m-1" key={move}>
        <button
          className={`border border-green-600 p-2 rounded-md bg-green-100 ${
            move === currentMove && 'bg-green-500'
          }`}
          onClick={() => onJump(move)}
        >
          {description}
        </button>
      </li>
    );
  });
  return <ul>{moves}</ul>;
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;

  const currentSquares = history[currentMove];

  const handleClick = (newSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), newSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  };

  return (
    <div className="flex justify-evenly">
      <div>
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handleClick}
        />
      </div>
      <div className="m-2">
        <History history={history} onJump={jumpTo} currentMove={currentMove} />
      </div>
    </div>
  );
}

export default Game;
