const { getChallengeData, runDay, sum, startChallenge, endChallenge } = require('./util')
const day = 3

function challenge1() {
  startChallenge(day, 1)
  const array = getChallengeData(day, true)


  const answer = 42
  endChallenge(day, 1, answer)
}

function challenge2() {
  startChallenge(day, 2)
  const array = getChallengeData(day, true)

  const answer = 42
  endChallenge(day, 2, answer)
}

runDay(day, challenge1, challenge2)

