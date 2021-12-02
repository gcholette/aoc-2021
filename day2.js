const { getChallengeData, runDay } = require('./util')

function challenge1() {
  const array = getChallengeData(2)

  const [horizPos, depthPos] = array.reduce(
    (acc, curr) => {
      const [horizontal, depth] = acc
      const value = +curr[curr.length - 1]
      const firstWord = curr.split(' ')[0]

      switch (firstWord) {
        case 'forward':
          return [+horizontal + value, +depth]
        case 'up':
          return [+horizontal, +depth - value]
        case 'down':
          return [+horizontal, +depth + value]
        default:
          break
      }
    },
    [0, 0]
  )

  return horizPos * depthPos
}

function challenge2() {
  const array = getChallengeData(2)

  const [horizPos, depthPos] = array.reduce(
    (acc, curr) => {
      const [horizontal, depth, aim] = acc
      const value = +curr[curr.length - 1]
      const firstWord = curr.split(' ')[0]

      switch (firstWord) {
        case 'forward':
          return [+horizontal + value, +depth + (aim * value), +aim]
        case 'up':
          return [+horizontal, +depth, +aim - value]
        case 'down':
          return [+horizontal, +depth, +aim + value]
        default:
          break
      }
    },
    [0, 0, 0]
  )

  return horizPos * depthPos
}

runDay(2, challenge1, challenge2)