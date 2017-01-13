// Implementation of the SuperMemo 2 algorithm as specified here: https://www.supermemo.com/english/ol/sm2.htm
import moment from 'moment'

const minimumDifficulty = 1.3

export function computeNewDifficulty(previousDifficulty, grade) {
  validateDifficulty(previousDifficulty)
  validateGrade(grade)

  let result = previousDifficulty - 0.8 + 0.28 * grade - 0.02 * grade * grade
  result = result.toFixed(2)

  return Math.max(result, minimumDifficulty)
}

export function computeNewRepetitionCount(previousRepetitionCount, grade) {
  validateRepetitionCount(previousRepetitionCount)
  validateGrade(grade)

  if (grade < 3) {
    return 0
  }

  return previousRepetitionCount + 1
}

export function computeNextReviewMs(nowMs, previousReviewMs, repetitionCount, difficulty) {
  validateRepetitionCount(repetitionCount)
  validateDifficulty(difficulty)

  if (nowMs === undefined || nowMs === null) {
    throw new Error(`nowMs must have a failure (received ${nowMs})`)
  }

  const intervalMs = computeNewIntervalMs(repetitionCount, difficulty, nowMs, previousReviewMs)

  return nowMs + intervalMs
}

function computeNewIntervalMs(repetitionCount, difficulty, nowMs, previousReviewMs) {
  if (repetitionCount === 0) {
    return moment.duration(0, 'days').valueOf()
  }

  if (repetitionCount === 1) {
    return moment.duration(1, 'days').valueOf()
  }

  if (repetitionCount === 2) {
    return moment.duration(6, 'days').valueOf()
  }

  if (previousReviewMs === undefined) {
    throw Error('Card was reviewed at least three times, but has no recorded previous review time.')
  }

  const intervalMs = nowMs - previousReviewMs

  if (intervalMs < 0) {
    throw Error(`The last recorded review occurred in the future (received ${moment(previousReviewMs).format()}, but now is ${moment(nowMs).format()}`)
  }

  return intervalMs * difficulty
}

function validateDifficulty(difficulty) {
  if (difficulty < minimumDifficulty) {
    throw Error(`difficulty should never fall below ${minimumDifficulty} (received ${difficulty})`)
  }
}

function validateGrade(grade) {
  const minimumGrade = 0
  const maximumGrade = 5

  if (Number.isInteger(grade) !== true) {
    throw Error(`grade must be an integer (received ${grade})`)
  }

  if (grade < minimumGrade || grade > maximumGrade) {
    throw Error(`grade must be an integer between ${minimumGrade}-${maximumGrade} inclusive (received ${grade})`)
  }
}

function validateRepetitionCount(repetitionCount) {
  if (Number.isInteger(repetitionCount) !== true) {
    throw Error(`repetitionCount must be an integer (received ${repetitionCount})`)
  }

  if (repetitionCount < 0) {
    throw Error(`repetitionCount must not be negative (received ${repetitionCount})`)
  }
}
