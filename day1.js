const { getChallengeData, runDay, sum, startChallenge, endChallenge } = require('./util')
const day = 1

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
  startChallenge(day, 1)
  const array = getChallengeData(1).map(x => +x)
  const answer = getReducedList(array)
  endChallenge(day, 1, answer)
  return answer
}

function challenge2() {
  startChallenge(day, 2)
  const array = getChallengeData(1).map(x => +x)
  const lists = []
  array.forEach((x, i) => i + 2 < array.length ? lists.push(sum([array[i], array[i + 1], array[i + 2]])): '' )

  const answer = getReducedList(lists)
  endChallenge(day, 2, answer)
  return answer
}

runDay(day, challenge1, challenge2)
