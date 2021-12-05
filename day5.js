const {
  getChallengeData,
  runDay,
  startChallenge,
  endChallenge
} = require('./util')
const day = 5

function parseLines(lines) {
  return lines.map((line) => {
    const a = line
      .split(' ')[0]
      .split(',')
      .map((x) => +x)
    const b = line
      .split(' ')[2]
      .split(',')
      .map((x) => +x)
    return [a, b]
  })
}

function getMaxX(lines) {
  return lines.reduce((acc, curr) => {
    if (curr[0][0] > acc) return +curr[0][0]
    if (curr[1][0] > acc) return +curr[1][0]
    return acc
  }, 0)
}

function getMaxY(lines) {
  return lines.reduce((acc, curr) => {
    if (curr[0][1] > acc) return +curr[0][1]
    if (curr[1][1] > acc) return +curr[1][1]
    return acc
  }, 0)
}

const createPlane = (x, y) =>
  [...new Array(y + 1)].map((row) => [...new Array(x + 1)].map((x) => 0))


function drawLine(plane, line) {
  const [[x1, y1], [x2, y2]] = line
  const direction = x1 === x2 ? 'y' : 'x'
  if (direction === 'x') {
    const start = x1 >= x2 ? x2 : x1
    const end = x1 >= x2 ? x1 : x2
    for (let y = 0; y < plane.length; y++) {
      for (let x = 0; x < plane[y].length; x++) {
        if (start <= x && x <= end && y === y2) {
          plane[y][x] += 1
        }
      }
    }
  } else {
    const start = y1 >= y2 ? y2 : y1
    const end = y1 >= y2 ? y1 : y2
    for (let y = 0; y < plane.length; y++) {
      for (let x = 0; x < plane[y].length; x++) {
        if (start <= y && y <= end && x === x2) {
          plane[y][x] += 1
        }
      }
    }
  }

  return plane
}

function drawDiagonal(plane, line) {
  let [[x1, y1], [x2, y2]] = line
  if (x1 > x2) {
    let tmp = x1
    x1 = x2
    x2 = tmp
    tmp = y1
    y1 = y2
    y2 = tmp
  }

  // going down
  if (y1 < y2) {
    for (let y = 0; y < plane.length; y++) {
      for (let x = 0; x < plane[y].length; x++) {
        if (x1 <= x && x2 >= x && y1 <= y && y2 >= y) {
          plane[y][x] += 1
          if (y < plane.length - 1) {
            y++
          }
        }
      }
    }
  } else {
    // going up
    for (let y = plane.length - 1; y >= 0; y--) {
      for (let x = 0; x < plane[y].length; x++) {
        if (x1 <= x && x2 >= x && y2 <= y && y1 >= y) {
          plane[y][x] += 1
          if (y > 0) {
            y--
          }
        }
      }
    }
  }

  return plane
}

function challenge1() {
  startChallenge(day, 1)
  const array = getChallengeData(day)
  const allLines = parseLines(array)

  const lines = allLines.filter(
    ([p1, p2]) => p1[0] === p2[0] || p1[1] === p2[1]
  )
  const maxX = getMaxX(allLines)
  const maxY = getMaxY(allLines)
  const basePlane = createPlane(maxX, maxY)

  lines.forEach((line) => drawLine(basePlane, line))

  const answer = basePlane.reduce(
    (acc, curr) =>
      curr.reduce((acc2, curr2) => (curr2 >= 2 ? acc2 + 1 : acc2), 0) + acc,
    0
  )

  endChallenge(day, 1, answer)
}


function challenge2() {
  startChallenge(day, 2)
  const array = getChallengeData(day)
  const allLines = parseLines(array)

  const horizontalAndVerticalLines = allLines.filter(
    ([p1, p2]) => p1[0] === p2[0] || p1[1] === p2[1]
  )

  const diagonalLines = allLines.filter(
    ([p1, p2]) => !(p1[0] === p2[0]) && !(p1[1] === p2[1])
  )

  const maxX = getMaxX(allLines)
  const maxY = getMaxY(allLines)

  const basePlane = createPlane(maxX, maxY)

  diagonalLines.forEach((diag) => drawDiagonal(basePlane, diag))

  horizontalAndVerticalLines.forEach((line) => drawLine(basePlane, line))

  const answer = basePlane.reduce(
    (acc, curr) =>
      curr.reduce((acc2, curr2) => (curr2 >= 2 ? acc2 + 1 : acc2), 0) + acc,
    0
  )

  endChallenge(day, 2, answer)
}

runDay(day, challenge1, challenge2)
