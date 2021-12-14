const { getChallengeData, runDay, sum, startChallenge, endChallenge } = require('./util')
const day = 13

const parseOperations = (list, acc = { dots: [], folds: [] }) => {
  if (list.length > 0) {
    const elem = list[0]
    return parseOperations(list.slice(1, list.length), {
      dots: elem.includes(',') ? [...acc.dots, elem.split(',')] : acc.dots,
      folds: elem.includes('fold') ? [...acc.folds, elem.split(' ')[2].split('=')] : acc.folds,
    })
  } else {
    return acc
  }
}

const renderDots = (dots) => {
  let display = ''
  for (let y = 0; y < dots.length; y++) {
    for (let x = 0; x < dots.length; x++) {
      if (dots.some((z) => x === z[0] && y === z[1])) {
        display += '#'
      } else {
        if (x < 40 && y < 8) {
          display += '.'
        }
      }
    }
    if (y < 7) {
      display += '\r\n'
    }
  }
  return display
}

const reflectValue = (value, axisValue) =>
  value > axisValue ? axisValue - (value - axisValue) : value

// prettier-ignore
const reflectDot = ([x, y], axisName, axisValue) => {
  switch (axisName) {
    case 'x': return [reflectValue(+x, axisValue), +y]
    case 'y': return [+x, reflectValue(+y, axisValue)]
  }
}

function challenge1() {
  startChallenge(day, 1)
  const { dots, folds } = parseOperations(getChallengeData(day, false))

  let sheet = dots
  for (let foldNumber = 0; foldNumber < 1; foldNumber++) {
    const fold = folds[foldNumber]
    sheet = sheet.map((dot) => reflectDot(dot, fold[0], fold[1]))
  }

  const render = renderDots(sheet)
  const count = render.split('').reduce((acc, curr) => (curr === '#' ? acc + 1 : acc), 0)

  const answer = count
  endChallenge(day, 1, answer)
}

function challenge2() {
  startChallenge(day, 2)
  const { dots, folds } = parseOperations(getChallengeData(day, false))

  let sheet = dots
  for (let foldNumber = 0; foldNumber < folds.length; foldNumber++) {
    const fold = folds[foldNumber]
    sheet = sheet.map((dot) => reflectDot(dot, fold[0], fold[1]))
  }

  const render = renderDots(sheet)

  const answer = `\r\n\r\n${render}\r\n\r\n`
  endChallenge(day, 2, answer)
}

runDay(day, challenge1, challenge2)
