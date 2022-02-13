const Squere = ({ id, board, setBoard, player, setPlayer }) => {
  const colors = ["red", "blue", "green"];
  const playerName = ["", "X", "O"];
  const getRandomColor = () => colors[Math.floor(Math.random() * 4)];
  return (
    <button
      onClick={() => {
        let newBoard = board;
        if (newBoard[id] === 0) {
          let newPlayer = 0;
          if (player == 1) {
            newPlayer = 2;
          } else {
            newPlayer = 1;
          }
          newBoard[id] = newPlayer;
          setBoard(newBoard);
          setPlayer(newPlayer);
        }
      }}
    >
      <h1>{playerName[board[id]]}</h1>
    </button>
  );
};
const Board = () => {
  const [player, setPlayer] = React.useState(-1);
  const [mounted, setMounted] = React.useState(true);
  const [score, setScore] = React.useState([]);
  const [board, setBoard] = React.useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  let checkWinner = (board) => {
    const win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 5, 6],
      [2, 4, 6],
    ];
    let winner = "";
    win.forEach((arr) => {
      let x = 0;
      let o = 0;
      arr.forEach((index) => {
        if (board[index] == 1) {
          x++;
        } else if (board[index] == 2) {
          o++;
        }
      });
      if (x == 3) {
        winner = "X";
      }
      if (o == 3) {
        winner = "O";
      }
    });
    return winner;
  };
  let winner = checkWinner(board);

  const playerName = ["", "O", "X"];
  let status = "player " + playerName[player] + " Winner is :" + winner;
  if (winner) {
    let newScore = score;
    if (winner == "X") {
      newScore.push("X");
    }
    if (winner == "O") {
      newScore.push("O");
    }
    setTimeout(() => {
      setBoard([0, 0, 0, 0, 0, 0, 0, 0, 0]);
      setPlayer(-1);
      setScore(newScore);
    }, 3000);
  } else if (!winner && !board.includes(0)) {
    let newScore = score;
    newScore.push("_");

    setTimeout(() => {
      setBoard([0, 0, 0, 0, 0, 0, 0, 0, 0]);
      setPlayer(-1);
      setScore(newScore);
    }, 3000);
  }
  let renderSquere = (i, val) => {
    return (
      <Squere
        id={i}
        val={val}
        board={board}
        setBoard={setBoard}
        player={player}
        setPlayer={setPlayer}
      />
    );
  };

  return (
    <div className="game-board">
      <div className="grid-row">
        {mounted && renderSquere(0)}
        {mounted && renderSquere(1)}
        {mounted && renderSquere(2)}
      </div>
      <div className="grid-row">
        {mounted && renderSquere(3)}
        {mounted && renderSquere(4)}
        {mounted && renderSquere(5)}
      </div>
      <div className="grid-row">
        {mounted && renderSquere(6)}
        {mounted && renderSquere(7)}
        {mounted && renderSquere(8)}
      </div>
      <div id="info">
        <h1>{status}</h1>
      </div>
      <div id="score">
        <ScoreDisplay score={score} />
      </div>
    </div>
  );
};

const ScoreDisplay = ({ score }) => {
  let count = [];
  count["X"] = 0;
  count["O"] = 0;
  let display = score.map((item, index) => {
    count[item]++;
    return <li key={index}>{item}</li>;
  });
  return (
    <>
      <ul>{display}</ul>
      <div>
        <div className="row row-cols-2">
          <div className="col">

            <h3>X</h3>
          </div>
          <div className="col">
           
            <h3>O</h3>
          </div>
        </div>
        <div className="row row-cols-2">
          <div className="col">

            <h4>{count["X"]}</h4>
          </div>
          <div className="col">
           
            <h4>{count["O"]}</h4>
          </div>
        </div>
      </div>
    </>
  );
};
ReactDOM.render(<Board />, document.getElementById("root"));
