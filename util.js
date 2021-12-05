const fs = require('fs')

const getInputsPath = (x) => `./inputs/input${x}.txt`

const getFileContentsAsArray = (filePath) =>
  fs
    .readFileSync(filePath)
    .toString()
    .split(/\r\n|\n/g)

const getChallengeData = (day) => getFileContentsAsArray(getInputsPath(day))

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
