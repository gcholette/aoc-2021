const { getChallengeData, runDay } = require('./util')
const day = 3

function challenge1() {
  const array = getChallengeData(day)

  const countPerColumn = array.reduce((acc, curr) => {
    if (acc.length === 0) {
      return curr.split('').map((x, i) => +x)
    } else {
      const currentArr = curr.split('').map((x, i) => +x)
      return acc.map((x, i) => {
        return +x + (+currentArr[i] === 1 ? 1 : -1)
      })
    }
  }, [])

  const dominantBits = countPerColumn.map((x) => (x > 0 ? 1 : 0))

  const gamma = parseInt(dominantBits.join(''), 2)
  const epsilon = parseInt(
    dominantBits.map((x) => (x === 1 ? 0 : 1)).join(''),
    2
  )

  return gamma * epsilon
}

function getRating(array, invert = false) {
  const countY = (array, x, entry = 0) => {
    return array.reduce((acc, curr) => {
      return acc + (curr[x] === entry ? 1 : 0)
    }, 0)
  }

  const ratings = [...array]
  const width = array[0].length

  for (let col = 0; col < width; col++) {
    const [zeros, ones] = [countY(ratings, col, 0), countY(ratings, col, 1)]
    const isZero = !invert ? zeros > ones : zeros <= ones
    const value = isZero ? 0 : 1

    for (let row = ratings.length - 1; row >= 0; row--) {
      if (ratings[row][col] !== value && ratings.length !== 1) {
        ratings.splice(row, 1)
      }
    }
  }

  return ratings[ratings.length - 1].join('')
}

function challenge2() {
  const array = getChallengeData(day).map((x) => x.split('').map((x) => +x))

  return (
    parseInt(getRating(array, false), 2) * parseInt(getRating(array, true), 2)
  )
}

runDay(day, challenge1, challenge2)
