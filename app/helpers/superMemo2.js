// Implementation of the SuperMemo 2 algorithm as specified here: https://www.supermemo.com/english/ol/sm2.htm
import moment from 'moment'

const minimumDifficulty = 1.3
const minimumGrade = 0
const maximumGrade = 5

export function computeNewDifficulty(previousDifficulty, grade) {
  if (previousDifficulty < minimumDifficulty) {
    throw Error(`difficulty should never fall below ${minimumDifficulty} (received ${previousDifficulty})`)
  }

  if (Number.isInteger(grade) !== true) {
    throw Error(`grade must be an integer (received ${grade})`)
  }

  if (grade < minimumGrade || grade > maximumGrade) {
    throw Error(`grade must be an integer between 0-5 inclusive (received ${grade})`)
  }

  let result = previousDifficulty - 0.8 + 0.28 * grade - 0.02 * grade * grade
  result = result.toFixed(2)

  return Math.max(result, minimumDifficulty)
}

export function computeNewRepetitionCount(previousRepetitionCount, grade) {
  if (previousRepetitionCount < 0) {
    throw Error(`repetition count should be negative (received ${previousRepetitionCount})`)
  }

  if (Number.isInteger(grade) !== true) {
    throw Error(`grade must be an integer (received ${grade})`)
  }

  if (grade < minimumGrade || grade > maximumGrade) {
    throw Error(`grade must be an integer between 0-5 inclusive (received ${grade})`)
  }

  if (grade < 3) {
    return 0
  }

  return previousRepetitionCount + 1
}

export function computeNextReviewMoment(now, repetitionCount, difficulty, previousReviewMoment) {
  const interval = computeNewIntervalMs(repetitionCount, difficulty, previousReviewMoment.diff(now))

  return now.add(interval)
}

function computeNewInterval(repetitionCount, difficulty, previousIntervalMs) {
  if (repetitionCount === 0) {
    return moment.duration(0, 'days')
  }

  if (repetitionCount === 1) {
    return moment.duration(1, 'days')
  }

  if (repetitionCount === 2) {
    return moment.duration(6, 'days')
  }

  return moment.duration(previousIntervalMs * difficulty)
}

