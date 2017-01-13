// Implementation of the SuperMemo 2 algorithm as specified here: https://www.supermemo.com/english/ol/sm2.htm
import moment from 'moment'

const minimumDifficulty = 1.3
const minimumCorrectGrade = 3

export function computeNewDifficulty(oldDifficulty, oldGrade, newGrade) {
  validateDifficulty(oldDifficulty)
  validateGrade(oldGrade)
  validateGrade(newGrade)

  if (oldGrade < minimumCorrectGrade) {
    return oldDifficulty
  }

  let result = oldDifficulty - 0.8 + 0.28 * newGrade - 0.02 * newGrade * newGrade
  result = result.toFixed(2)

  return Math.max(result, minimumDifficulty)
}

export function computeNewRepetitionCount(oldRepetitionCount, newGrade) {
  validateRepetitionCount(oldRepetitionCount)
  validateGrade(newGrade)

  if (newGrade < minimumCorrectGrade) {
    return 0
  }

  return oldRepetitionCount + 1
}

export function computeNextReviewMs(nowMs, previousReviewMs, newRepetitionCount, newDifficulty) {
  validateRepetitionCount(newRepetitionCount)
  validateDifficulty(newDifficulty)

  if (nowMs === undefined || nowMs === null) {
    throw new Error(`nowMs must have a failure (received ${nowMs})`)
  }

  const intervalMs = computeNewIntervalMs(newRepetitionCount, newDifficulty, nowMs, previousReviewMs)

  return nowMs + intervalMs
}

function computeNewIntervalMs(newRepetitionCount, newDifficulty, nowMs, previousReviewMs) {
  if (newRepetitionCount === 0) {
    return moment.duration(0, 'days').valueOf()
  }

  if (newRepetitionCount === 1) {
    return moment.duration(1, 'days').valueOf()
  }

  if (newRepetitionCount === 2) {
    return moment.duration(6, 'days').valueOf()
  }

  if (previousReviewMs === undefined) {
    throw Error('Card was reviewed at least three times, but has no recorded previous review time.')
  }

  const intervalMs = nowMs - previousReviewMs

  if (intervalMs < 0) {
    throw Error(`The last recorded review occurred in the future (received ${moment(previousReviewMs).format()}, but now is ${moment(nowMs).format()}`)
  }

  return intervalMs * newDifficulty
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
