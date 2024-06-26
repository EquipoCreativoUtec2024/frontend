'use client';
import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './_components/Square'
import { TURNS } from './constants'
import { checkWinnerFrom, checkEndGame } from './_logic/board'
import { WinnerModal } from './_components/WinnerModal'
import { UpdateBoard } from './_components/UpdateBoard'
import './shotsEnRaya.css'

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  // null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null)
  const [loser, setLoser] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    setLoser(null)
  }

  const updateBoard = (index: Number) => {
    // si ya tiene algo, no se actualiza esta posición o ya hay ganador
    if (board[index] || winner) return

    // actualizar el tablero
    const newBoard = [...board]
    // no se modifican los estados, se crean nuevos
    newBoard[index] = turn
    setBoard(newBoard) // asíncrona

    // cambiar turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner) // actualiza el estado
      const theLoser = newWinner === TURNS.X ? TURNS.O : TURNS.X
      setLoser(theLoser)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // empate
      setLoser(null) // no hay perdedor en un empate
    }
  }

  return (
    <main className='board'>
      <h1>SHOTS EN RAYA</h1>
      <button onClick={resetGame}>Reset del Juego</button>

      <UpdateBoard board={board} updateBoard={updateBoard} />

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} loser={loser} winner={winner} />

    </main>
  )
}

export default App
