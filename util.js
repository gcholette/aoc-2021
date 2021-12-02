const fs = require('fs')

const getInputsPath = (x) => `./inputs/input${x}.txt`

const getFileContentsAsArray = (filePath) =>
  fs.readFileSync(filePath).toString().split(/\r\n|\n/g)

const getChallengeData = (day) => getFileContentsAsArray(getInputsPath(day)) 

const logDay = (x) => console.log(`***** Day ${x} *****`)

const runDay = (day, ...fns) => {
  logDay(day)
  fns.forEach(fn => console.log(fn()))
}

function sum(array) {
  return array.reduce((acc, x) => acc + x, 0)
}

module.exports = {
    getChallengeData,
    runDay,
    sum
}
