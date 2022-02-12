const Squere = ({ id,val,board,setBoard,player,setPlayer }) => {
  const colors = ["red", "blue", "green"];
  const playerName = ['','X','O'];
  const getRandomColor = () => colors[Math.floor(Math.random() * 4)];
  return (
    <button
      onClick={() => {
         let newBoard = board;
         if(newBoard[id]===0){
         
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
  const [board,setBoard] = React.useState([0,0,0,0,0,0,0,0,0])
  
  let checkWinner = (board)=>{
    const win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 5, 6],
    ];
    let winner = '';
    win.forEach((arr)=>{
      let x =0;
      let o =0;
      arr.forEach((index)=>{
        if(board[index] == 1 ){
          x++;
        }
        else if(board[index] == 2){
          o++;
        }
      });
      if(x==3){
        winner = 'X';
      }
      if(o==3){
        winner = 'O';
      }
    });
    return winner;
  }
  let winner =checkWinner(board);

  const playerName = ['','X','O'];
  let status = "player " + playerName[player] +" Winner is :"+winner;
  if(winner){
    setTimeout(() => {
      setBoard([0,0,0,0,0,0,0,0,0]);
      setPlayer(1);

    }, 3000);
  }
  else if(!winner && !board.includes(0) ){
    setTimeout(() => {
      setBoard([0,0,0,0,0,0,0,0,0]);
      setPlayer(1);

    }, 3000);
  }
  let renderSquere = (i,val) => {
    return <Squere id={i} val={val} board={board} setBoard={setBoard} player={player} setPlayer ={setPlayer} />;
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
    </div>
  );
};

ReactDOM.render(<Board />, document.getElementById("root"));
