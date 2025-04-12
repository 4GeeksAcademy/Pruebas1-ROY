import React, { useState } from "react";

const TURNS ={
    X: 'x',
    O: 'o'
}



const Square =({children,isSelected, updateBoard, index})=>{
    const className = `square ${isSelected?'is-selected':''}`
    
    const handleClick =()=>{
        updateBoard(index)

    }
    return (
        <div onClick={handleClick} className={className}>
            {children}
        </div>
    )
}

const WINNER_COMBOS =[
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
]

//create your first component
function App() {

    const [board,setBoard] = useState(Array(9).fill(null))
    const [winner,setWinner] = useState (null)//null es que no hay ganador,false es que hay un empate
console.log(board)

const checkWinner =(boardTocheck) =>{
for (const combo of WINNER_COMBOS){
    const [a,b,c] = combo
    if(
        boardTocheck[a]&&
        boardTocheck[a]===  boardTocheck[b]&&
        boardTocheck[a]===  boardTocheck[c]

    ){
        return boardTocheck[a]
    }
}
return null
}


const resetGame =()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
}

const checkEndGame =(newBoard) =>{
    return newBoard.every((square)=> square !==null )
}

const [turn,setTurn]= useState(TURNS.X)

const updateBoard = (index) => {
//este if es para que no se sobrescriba si ya tiene algo  o hay ganador//
    if(board[index] || winner) return

    //actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    //cambiar el turno
const newTurn = turn === TURNS.X? TURNS.O : TURNS.X
setTurn(newTurn)

//revisar si hay ganador

const newWinner = checkWinner(newBoard)

if (newWinner){
    setWinner(newWinner)
      
}else if(checkEndGame(newBoard)){
    setWinner(false) //un empate
}
}

    return (
<main className="board">
   <h1> TIC TAC TOE</h1>
   <button onClick={resetGame}>Reset del juego</button>
   <section className="game">
{
    board.map((square,index)=>{
        return( <Square
             key ={index} 
            index={index}
            updateBoard ={updateBoard}
            >
                {square}
            </Square>
        )

    })
}
   </section>
   <section className="turn">
    <Square isSelected={turn ===TURNS.X}>{TURNS.X}</Square>
    <Square isSelected={turn ===TURNS.O}>{TURNS.O}</Square>
   </section>
   {

    winner !== null &&(
        <section className="winner">
<div className="text">

<h2>
{
    winner === false
    ? 'Empate'
    : 'Ganó:' 
}


</h2>
<header className="win">
{winner && <Square>{winner}</Square>}

</header>
<footer>

    <button onClick={resetGame}> Empezar de nuevo </button>
</footer>
</div>

        </section>
    )
   }
</main>
    )
}

export default App;