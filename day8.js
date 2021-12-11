const { getChallengeData, runDay, sum, startChallenge, endChallenge } = require('./util')
const day = 8

function createDigitMap() {
  return {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
  }
}

function formatEntries(array) {
  const pairs = []
  for (let i = 0; i < array.length; i++) {
    const element = array[i]
    if (!element.includes('|')) {
      pairs[pairs.length - 1] += ' ' + element
    } else {
      pairs.push(element)
    }
  }
  return pairs
}

function identifyDigits(pair) {
  const [patterns, output] = pair.split(' | ')
  const splitPatterns = patterns.split(' ')
  const splitOutput = output.split(' ')

  const digitMap = createDigitMap()

  for (let i = 0; i < splitPatterns.length; i++) {
    const pattern = splitPatterns[i]
    if (pattern.length === 2) {
      digitMap[1] = pattern.split('')
    } else if (pattern.length === 3) {
      digitMap[7] = pattern.split('')
    } else if (pattern.length === 4) {
      digitMap[4] = pattern.split('')
    } else if (pattern.length === 7) {
      digitMap[8] = pattern.split('')
    }
  }

  countOutput = splitOutput.reduce((acc, curr) => {
    if (
      (digitMap[1].every((x) => curr.includes(x)) && digitMap[1].length === curr.length) ||
      (digitMap[4].every((x) => curr.includes(x)) && digitMap[4].length === curr.length) ||
      (digitMap[7].every((x) => curr.includes(x)) && digitMap[7].length === curr.length) ||
      (digitMap[8].every((x) => curr.includes(x)) && digitMap[8].length === curr.length)
    ) {
      return acc + 1
    } else return acc
  }, 0)

  return countOutput
}

function challenge1() {
  startChallenge(day, 1)
  const array = formatEntries(getChallengeData(day, false))

  let bigsum = 0

  for (let i = 0; i < array.length; i++) {
    const entry = array[i]
    const count = identifyDigits(entry)
    bigsum += count
  }
  endChallenge(day, 1, bigsum)
}

function identifyDigits2(pair) {
  const [patterns, output] = pair.split(' | ')
  const splitPatterns = patterns.split(' ')
  const splitOutput = output.split(' ')
  const checkForN = (n, pattern) => digitMap[n].every((x) => pattern.includes(x))

  const digitMap = createDigitMap()
  for (let j = 0; j < 15; j++) {
    for (let i = 0; i < splitPatterns.length; i++) {
      const pattern = splitPatterns[i]
      if (pattern.length === 2) {
        digitMap[1] = pattern.split('')
      } else if (pattern.length === 3) {
        digitMap[7] = pattern.split('')
      } else if (pattern.length === 4) {
        digitMap[4] = pattern.split('')
      } else if (pattern.length === 7) {
        digitMap[8] = pattern.split('')
      } else if (
        pattern.length === 6 &&
        checkForN(1, pattern) &&
        checkForN(7, pattern) &&
        checkForN(4, pattern)
      ) {
        digitMap[9] = pattern.split('')
      } else if (
        pattern.length === 6 &&
        checkForN(1, pattern) &&
        checkForN(7, pattern) &&
        !checkForN(4, pattern)
      ) {
        digitMap[0] = pattern.split('')
      } else if (pattern.length === 6 && !checkForN(1, pattern) && !checkForN(4, pattern)) {
        digitMap[6] = pattern.split('')
      } else if (
        pattern.length === 5 &&
        digitMap[6].reduce((acc, x) => (pattern.includes(x) ? 1 : 0) + acc, 0) === 5
      ) {
        digitMap[5] = pattern.split('')
      } else if (
        pattern.length === 5 &&
        !checkForN(1, pattern) &&
        !checkForN(4, pattern) &&
        !checkForN(7, pattern)
      ) {
        digitMap[2] = pattern.split('')
      } else if (pattern.length === 5 && checkForN(1, pattern) && checkForN(7, pattern)) {
        digitMap[3] = pattern.split('')
      }
    }
  }

  const countOutput = splitOutput.reduce((acc, curr) => {
    const matchingDigit = [...Object.keys(digitMap)].reduce(
      (acc2, curr2, i) =>
        digitMap[curr2].every((x) => curr.includes(x)) && digitMap[curr2].length === curr.length
          ? i
          : acc2,
      -1
    )
    return acc + '' + matchingDigit
  }, '')

  return countOutput
}

function challenge2() {
  startChallenge(day, 2)
  const array = formatEntries(getChallengeData(day, false))

  const results = []

  for (let i = 0; i < array.length; i++) {
    const entry = array[i]
    results.push(identifyDigits2(entry))
  }

  const answer = sum(results.map((x) => parseInt(x)))
  endChallenge(day, 2, answer)
}

runDay(day, challenge1, challenge2)
