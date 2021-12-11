const { getChallengeData, runDay, sum, startChallenge, endChallenge } = require('./util')
const day = 9

const getAdjacentPoints = (x, y, map) => {
  const points = []
  if (y > 0 && y <= map.length) {
    points.push(map[y - 1][x])
  }
  if (y < map.length - 1 && y >= 0) {
    points.push(map[y + 1][x])
  }
  if (x < map[y].length - 1 && x >= 0) {
    points.push(map[y][x + 1])
  }
  if (x > 0 && x <= map[y].length) {
    points.push(map[y][x - 1])
  }
  return points
}

const findLowPoints = (map) => {
  const newMap = [...map].map((x) => x.split(''))
  const lowPoints = []
  for (let y = 0; y < newMap.length; y++) {
    for (let x = 0; x < newMap[y].length; x++) {
      const currentValue = newMap[y][x]
      const adjacentPoints = getAdjacentPoints(x, y, newMap)

      const isMinList = adjacentPoints.reduce(
        (acc, curr) => (curr > currentValue ? [...acc, curr] : acc),
        []
      )

      if (isMinList.length === adjacentPoints.length) {
        lowPoints.push(currentValue)
      }
    }
  }
  return lowPoints
}

const createBasinMap = (heightMap) =>
  heightMap.map((y) =>
    y.map((x) => ({
      value: +x,
      marked: false,
      basinId: -1,
    }))
  )

const movePointInDirection = (point, direction = 'up') => {
  const [x, y] = point
  switch (direction) {
    case 'up':
      return [x, y - 1]
    case 'down':
      return [x, y + 1]
    case 'left':
      return [x - 1, y]
    case 'right':
      return [x + 1, y]
  }
}

const recurseBasin = (basinMap, point = [-1, -1], basinAccumulator = []) => {
  const [x, y] = point
  if (
    x < 0 ||
    y < 0 ||
    x === basinMap[y]?.length ||
    y === basinMap?.length ||
    basinMap[y][x]?.value === 9
  ) {
    return basinAccumulator
  }
  const { marked, value } = basinMap[y][x]
  const returnValue = { point, value }
  const acc = [...basinAccumulator, returnValue]

  if (!marked && value !== 9) {
    basinMap[y][x].marked = true

    return [
      ...recurseBasin(basinMap, movePointInDirection(point, 'up'), acc),
      ...recurseBasin(basinMap, movePointInDirection(point, 'down'), acc),
      ...recurseBasin(basinMap, movePointInDirection(point, 'right'), acc),
      ...recurseBasin(basinMap, movePointInDirection(point, 'left'), acc),
    ]
  } else {
    return basinAccumulator
  }
}

function challenge1() {
  startChallenge(day, 1)
  const map = getChallengeData(day, false)

  const lowPoints = findLowPoints(map).map((x) => +x)

  const answer = lowPoints.reduce((acc, curr) => acc + curr + 1, 0)
  endChallenge(day, 1, answer)
}

function challenge2() {
  startChallenge(day, 2)
  const array = getChallengeData(day)
  const basinMap = createBasinMap(array.map((x) => x.split('')))

  const sets = []

  let doneForThisBasin = false

  for (let y = 0; y < basinMap.length; y++) {
    for (let x = 0; x < basinMap[y].length; x++) {
      if (!doneForThisBasin) {
        sets.push(new Set(recurseBasin(basinMap, [x, y])))
        doneForThisBasin = true
      }
      if (basinMap[y][x].value === 9) {
        doneForThisBasin = false
      }
    }
  }

  const basins = [...sets.map((x) => [...x])]
    .filter((x) => x.length)
    .sort((a, b) => (a.length > b.length ? -1 : 1))

  const [top1Basin, top2Basin, top3Basin] = basins
  const answer = top1Basin.length * top2Basin.length * top3Basin.length

  endChallenge(day, 2, answer)
}

runDay(day, challenge1, challenge2)
