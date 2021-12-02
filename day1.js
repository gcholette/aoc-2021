const { getChallengeData, runDay, sum } = require('./util')

function getReducedList(array) {
  return array.reduce((acc, curr, i) => {
    if (i === 0) {
      return +acc
    } else {
      if (curr > array[i - 1]) {
        return (acc + 1)
      } else if (curr <= array[i - 1]) {
        return +acc
      }
    }
  }, 0)
}

function challenge1() {
  const array = getChallengeData(1).map(x => +x)
  return getReducedList(array)
}

function challenge2() {
  const array = getChallengeData(1).map(x => +x)
  const lists = []
  array.forEach((x, i) => i + 2 < array.length ? lists.push(sum([array[i], array[i + 1], array[i + 2]])): '' )
  return getReducedList(lists)
}

runDay(1, challenge1, challenge2)
