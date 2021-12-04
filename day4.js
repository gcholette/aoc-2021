const { getChallengeData, runDay, sum } = require('./util')
const day = 4

function createCell(value, marked = false) {
  return {
    value,
    marked,
  }
}

function parseBoards(data) {
  const strBoards = data.reduce(
    (acc, curr, i) => {
      const { loadingBoards, currentBoard } = acc
      const isCurrentBoardFull = currentBoard.length === 5

      if (i === 0) return acc
      if (i === data.length - 1) {
        return [...loadingBoards, [...currentBoard, curr]]
      } else if (curr !== '' && !isCurrentBoardFull) {
        return { loadingBoards, currentBoard: [...currentBoard, curr] }
      } else if (isCurrentBoardFull) {
        return {
          loadingBoards: [...loadingBoards, currentBoard],
          currentBoard: [],
        }
      } else {
        return acc
      }
    },
    { loadingBoards: [], currentBoard: [] }
  )

  return strBoards.map((board) =>
    board.map((line) =>
      line
        .split(' ')
        .filter((x) => x !== '')
        .map((x) => createCell(x))
    )
  )
}

function markBoard(board, number) {
  return board.map((line) =>
    line.map((cell) => {
      if (cell.value === number) {
        return createCell(cell.value, true)
      } else {
        return cell
      }
    })
  )
}

function isBoardWinner(board) {
  const win = (board) =>
    board.reduce((acc, line, i) => {
      const lineHorizWin = line.reduce((acc2, cell) => {
        return !cell.marked ? false : acc2
      }, true)
      return lineHorizWin ? true : acc
    }, false)

  return win(board) || win(board[0].map((x, i) => board.map((x) => x[i])))
}

function boardUnmarkedSum(board) {
  return board.reduce((acc, curr) => {
    return (
      acc +
      curr.reduce(
        (acc2, curr2) => (!curr2.marked ? parseInt(curr2.value) + acc2 : acc2),
        0
      )
    )
  }, 0)
}

function challenge1() {
  const array = getChallengeData(day)
  const turns = array[0].split(',')
  const boards = parseBoards(array)

  const finalSum = turns.reduce((acc, turnNumber) => {
    if (!Array.isArray(acc)) {
      return acc
    }
    const newMarkedBoards = acc.map((board) => markBoard(board, turnNumber))
    const winnerBoard = newMarkedBoards.find((x) => isBoardWinner(x))

    if (winnerBoard) {
      return boardUnmarkedSum(winnerBoard) * parseInt(turnNumber)
    }
    return newMarkedBoards
  }, boards)

  return finalSum
}

function challenge2() {
  const array = getChallengeData(day)
  const turns = array[0].split(',')
  const boards = parseBoards(array).map((board, i) => ({
    content: board,
    id: i,
    hasWon: false,
  }))

  let lastWinner = {}
  let allBoardsWon = false

  for (turn of turns) {
    for (board of boards) {
      if (allBoardsWon) {
        break
      }

      board.content = markBoard(board.content, turn)

      if (isBoardWinner(board.content)) {
        lastWinner = board
        board.hasWon = true
        allBoardsWon = boards.reduce(
          (acc, curr) => (!curr.hasWon ? false : acc),
          true
        )
      }
    }

    if (allBoardsWon) {
      return boardUnmarkedSum(lastWinner.content) * parseInt(turn)
    }
  }
}

runDay(day, challenge1, challenge2)
