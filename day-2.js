const { getFileContentsAsArray } = require('./util')

function aoc21() {
  const array = getFileContentsAsArray('./input2.txt')

  const [horizPos, depthPos] = array.reduce(
    (acc, curr, i) => {
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

function aoc22() {
  const array = getFileContentsAsArray('./input2.txt')

  const [horizPos, depthPos] = array.reduce(
    (acc, curr, i) => {
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

console.log(aoc21())
console.log(aoc22())
