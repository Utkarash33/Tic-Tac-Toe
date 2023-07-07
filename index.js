document.addEventListener('DOMContentLoaded',()=>
{
    const gridCells = document.querySelectorAll('.grid-cell');
    const currentPlayerText = document.querySelector(".current-player");
    const gameOverText = document.querySelector(".game-over-text");
    const restartButton = document.querySelector(".restart");

   
    let currentPlayer = "X";

    let gameActive = true;

 const board = [['','',''],
                ['','',''],
                ['','','']]


    const cellClickHandler = (event)=>
    {
       const cell = event.target;
       const cellIndex = parseInt(cell.dataset.value)
       const [row,col] = getCellCoordinates(cellIndex);
       if(!gameActive || cell.textContent!=='')
       {
        return;
       }
  
       cell.textContent = currentPlayer;
       board[row][col]= currentPlayer;

       if(checkWin(currentPlayer))
       {
        gameOver(currentPlayer +' wins!');
       }
       else if(checkDraw())
       {
        gameOver('Draw!');
       }
       else
       {
        currentPlayer = currentPlayer === 'X'? 'O' :'X';
        currentPlayerText.textContent = `Its ${currentPlayer} turn`;
       }
        
    };

const getCellCoordinates = (cellIndex)=>
{
    const row = Math.floor(cellIndex/3);
    const col = cellIndex%3;
    return[row,col]
}
  

const checkDraw =()=>
{
    return Array.from(gridCells).every(cell=> cell.textContent!=='');
}

const gameOver = (msg)=>
{
    gameActive= false;
    gameOverText.textContent = msg;
}

const checkWin = (player)=>
{
 const winningCombinations = [
    //Rows
    [0,1,2],[3,4,5],[6,7,8],
    //columns
    [0,3,6],[1,4,7],[2,5,8],
    //digonals
    [0,4,8],[2,4,6]
 ];

  for(let com of winningCombinations)
  {
    const [a,b,c] = com;

    if(
        board[Math.floor(a/3)][a%3]=== player &&
        board[Math.floor(b/3)][b%3]=== player &&
        board[Math.floor(c/3)][c%3]=== player
    )
    {
        return true;
    }
  }
   return false;

}

const restartGame = ()=>
{
    currentPlayer ="X";
    gameActive = true;
    
    currentPlayerText.textContent = "Its "+currentPlayer+" turn.";
    gameOverText.textContent ="";
      for(let row=0;row<3;row++)
      {
        for(let col =0;col<3;col++)
        {
            board[row][col]='';
        }
      }

      gridCells.forEach((cell)=>
      {
        cell.textContent ='';
      })
    };
    gridCells.forEach(cell=>cell.addEventListener('click',cellClickHandler));
    restartButton.addEventListener('click',restartGame);
    
})