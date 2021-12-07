const {
  getChallengeData,
  runDay,
  sum,
  startChallenge,
  endChallenge,
} = require('./util')
const day = 7

const getMax = (positions) =>
  positions.reduce((acc, curr) => (curr > acc ? curr : acc), 0)

function align(positions, variant = 1) {
  const max = getMax(positions)
  const solutions = []

  if (variant === 2) {
    for (let tries = 0; tries <= max; tries++) {
      const newSolutions = positions.map((pos) => {
        const distance = Math.abs(pos - tries)
        const wow = [...new Array(distance)]
          .map((x, i) => i + 1)
          .reduce((acc, curr) => curr + acc, 0)
        return wow
      })
      solutions.push(sum(newSolutions))
    }
  } else {
    for (let tries = 0; tries <= max; tries++) {
      const newSolutions = positions.map((pos) => {
        return Math.abs(pos - tries)
      })
      solutions.push(sum(newSolutions))
    }
  }

  let min = null
  for (let i = 0; i < solutions.length; i++) {
    if (min === null) {
      min = solutions[i]
    } else if (solutions[i] < min) {
      min = solutions[i]
    }
  }

  return min
}

function challenge1() {
  startChallenge(day, 1)
  const array = getChallengeData(day, true)[0]
    .split(',')
    .map((x) => +x)

  const answer = align(array)
  endChallenge(day, 1, answer)
}

function challenge2() {
  startChallenge(day, 2)
  const array = getChallengeData(day, false)[0]
    .split(',')
    .map((x) => +x)

  const answer = align(array, 2)
  endChallenge(day, 2, answer)
}

runDay(day, challenge1, challenge2)
