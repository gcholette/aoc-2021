const fs = require('fs')

const getInputsPath = (x, test) => test ? `./inputs/input${x}_test.txt` : `./inputs/input${x}.txt`

const getFileContentsAsArray = (filePath) =>
  fs
    .readFileSync(filePath)
    .toString()
    .split(/\r\n|\n/g)

const getChallengeData = (day, test = false) => getFileContentsAsArray(getInputsPath(day, test))

const logDay = (x) => console.log(`\n******* Day ${x} *******`)

const runDay = (day, ...fns) => {
  logDay(day)
  fns.forEach((fn) => fn())
  console.log('*********************\n')
}

function sum(array) {
  return array.reduce((acc, x) => acc + x, 0)
}

module.exports = {
  getChallengeData,
  runDay,
  sum,
  startChallenge: (day, challengeNumber) =>
    console.time(`${day}${challengeNumber}`),
  endChallenge: (day, challengeNumber, answer) => {
    console.timeEnd(`${day}${challengeNumber}`)
    console.log(`Answer: ${answer}`)
  },
}
