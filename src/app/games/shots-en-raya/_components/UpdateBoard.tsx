import '../shots.css'
import { Square } from './Square'

export interface UpdateBoardProps {
  board: string[]
  updateBoard: (index: number) => void
}

export const UpdateBoard = ({ board, updateBoard } : UpdateBoardProps) => {
  return (
    <section className='game'>
      {
        board.map((square, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {square}
            </Square>
          )
        })
      }
    </section>
  )
}