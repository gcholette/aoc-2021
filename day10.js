const { getChallengeData, runDay, sum, startChallenge, endChallenge } = require('./util')
const day = 10

const pointTable = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

const incompleteScoreTable = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
}

const matchingOpeningSymbol = {
  ')': '(',
  ']': '[',
  '}': '{',
  '>': '<',
}

const matchingClosingSymbol = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
}

const closingSymbols = Object.keys(pointTable)

const parseCode = (code = '', stack = []) => {
  if (code.length < 1) return { status: true, symbol: '', stack }
  const symbol = code[0]

  if (closingSymbols.some((x) => x === symbol)) {
    // closing characters
    if (stack.length < 1) return { status: false, symbol: '', stack }
    if (stack[0] !== matchingOpeningSymbol[symbol]) return { status: false, symbol, stack }

    return parseCode(code.slice(1, code.length), stack.slice(1, stack.length))
  } else {
    // opening characters
    return parseCode(code.slice(1, code.length), [symbol, ...stack])
  }
}

function challenge1() {
  startChallenge(day, 1)
  const array = getChallengeData(day, false)

  const validations = array.map((x) => parseCode(x))
  const corruptedScores = validations.reduce((acc, curr) => {
    if (!curr.status) {
      const score = pointTable[curr.symbol]
      return acc + score
    } else {
      return acc
    }
  }, 0)

  const answer = corruptedScores
  endChallenge(day, 1, answer)
}

function challenge2() {
  startChallenge(day, 2)
  const array = getChallengeData(day, false)
  const validations = array.map((x) => parseCode(x))

  const incompleteScores = validations.reduce((acc, curr) => {
    if (curr.status) {
      const score = curr.stack.reduce((acc2, curr2) => {
        const s = incompleteScoreTable[matchingClosingSymbol[curr2]]
        return acc2 * 5 + s
      }, 0)
      return [...acc, score]
    } else {
      return acc
    }
  }, [])

  const middleScore = incompleteScores.sort((a, b) => (a - b > 0 ? 1 : -1))[
    Math.round(incompleteScores.length / 2) - 1
  ]

  const answer = middleScore
  endChallenge(day, 2, answer)
}

runDay(day, challenge1, challenge2)
