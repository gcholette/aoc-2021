const {
  getChallengeData,
  runDay,
  sum,
  startChallenge,
  endChallenge,
} = require('./util')
const day = 6

function simulateDays(fishes, days) {
  if (days === 0) {
    return fishes
  }

  const initialFishLength = +fishes.length
  for (let i = 0; i < initialFishLength; i++) {
    if (fishes[i] === 0) {
      fishes[i] = 6
      fishes.push(8)
    } else {
      fishes[i] = fishes[i] - 1
    }
  }

  return simulateDays(fishes, days - 1)
}

function simulateDays2(fishes, fishesCounter, days) {
  if (days === 0) {
    return sum(fishesCounter)
  }

  let newFish = 0
  let revivingFish = 0
  const newCounter = [0, 0, 0, 0, 0, 0, 0, 0, 0]

  for (let i = 0; i <= fishesCounter.length; i++) {
    if (i === 0) {
      newFish = fishesCounter[i]
      revivingFish = fishesCounter[i]
    } else {
      newCounter[i - 1] = fishesCounter[i]
    }
  }

  newCounter[6] = newCounter[6] + revivingFish
  newCounter[8] = newFish

  return simulateDays2(fishes, newCounter, days - 1)
}

function challenge1() {
  startChallenge(day, 1)
  const array = getChallengeData(day, false)
  const fishesToArray = array[0].split(',').map((x) => +x)

  const fishAfter80Days = simulateDays(fishesToArray, 80)

  const answer = fishAfter80Days.length
  endChallenge(day, 1, answer)
}

function challenge2() {
  startChallenge(day, 2)
  const array = getChallengeData(day, false)
  const fishes = array[0].split(',').map((x) => +x)

  const fishesCount = [0, 0, 0, 0, 0, 0, 0, 0, 0]

  for (let i = 0; i < fishes.length; i++) {
    const fish = fishes[i]
    fishesCount[fish] += 1
  }

  const answer = simulateDays2(fishes, fishesCount, 256)
  endChallenge(day, 2, answer)
}

runDay(day, challenge1, challenge2)
