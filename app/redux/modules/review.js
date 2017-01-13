import { Map } from 'immutable'
import moment from 'moment'
import { getRandomInt } from 'helpers/random'
import {
  computeNewDifficulty,
  computeNewRepetitionCount,
  computeNextReviewMs,
  isDue,
} from 'helpers/superMemo2'
import {
  saveCardHistory
} from 'helpers/firebase'

// Actions
const SET_CURRENT_CARD = 'SET_CURRENT_CARD'
const TOGGLE_ANSWER_VISIBLE = 'TOGGLE_ANSWER_VISIBLE'
const GRADING_CARD = 'GRADING_CARD'
const GRADING_CARD_SUCCESS = 'GRADING_CARD_SUCCESS'
const GRADING_CARD_FAILURE = 'GRADING_CARD_FAILURE'
const DISMISS_REVIEW_SNACKBAR = 'DISMISS_REVIEW_SNACKBAR'

// thunks
function getNewCardHistory(oldHistory, nowMs, newGrade) {
  const oldDifficulty = history.get('difficulty')
  const oldGrade = history.get('oldGrade')
  const oldRepetitionCount = history.get('repetitionCount')
  const oldPreviousReviewMs = history.get('previousReviewMs')

  const newDifficulty = computeNewDifficulty(oldDifficulty, oldGrade, newGrade)
  const newRepetitionCount = computeNewRepetitionCount(oldRepetitionCount, newGrade)
  const newPreviousReviewMs = nowMs
  const newNextReviewMs = computeNextReviewMs(nowMs, oldPreviousReviewMs, newRepetitionCount, newDifficulty)

  return {
    grade: newGrade,
    difficulty: newDifficulty,
    repetitionCount: newRepetitionCount,
    previousReviewMs: newPreviousReviewMs,
    nextReviewMs: newNextReviewMs,
  }
}

export function gradeAndShowNextCard(nowMs, newGrade, deckId) {
  return async (dispatch, getState, firebaseContext) => {
    // TODO
    dispatch(gradingCard())

    try {
      const { auth, cards, review } = getState()
      const authedUid = auth.get('authedUid')

      const cardId = review.get('currentCardId')
      if (!cardId) {
        throw new Error('Cannot grade card when there is no current card.')
      }

      const oldHistory = cards.getIn(['cards', cardId, 'history'])
      const newHistory = getNewCardHistory(oldHistory, nowMs, newGrade)

      await saveCardHistory(firebaseContext, authedUid, deckId, cardId, newHistory)

      dispatch(showNextCard(nowMs, deckId))
      dispatch(gradingCardSuccess())
    }
    catch (error) {
      dispatch(gradingCardFailure(`Error grading card: ${error.message}`))
    }
  }
}

export function showNextCard(nowMs, deckId) {
  return (dispatch, getState, firebaseContext) => {
    const { cards, decks, review } = getState()

    const currentCardId = review.get('currentCardId')
    const cardIds = decks
      .getIn(['decks', deckId, 'cards'])
      .keySeq()
      .filter(cardId => {
        const history = cards.getIn(['cards', cardId, 'history'])
        return cardId !== currentCardId && isDue(nowMs, history.get('nextReviewMs'), history.get('grade'))
      })

    const randomCardId = cardIds
      .skip(getRandomInt(0, cardIds.size))
      .take(1)
      .first()

    dispatch(setCurrentCard(randomCardId ? randomCardId : ''))
  }
}

// Action creators
export function setCurrentCard(cardId) {
  return {
    type: SET_CURRENT_CARD,
    cardId,
  }
}

export function toggleAnswerVisible() {
  return {
    type: TOGGLE_ANSWER_VISIBLE,
  }
}

function gradingCard() {
  return {
    type: GRADING_CARD,
  }
}

function gradingCardSuccess() {
  return {
    type: GRADING_CARD_SUCCESS,
  }
}

function gradingCardFailure(error) {
  return {
    type: GRADING_CARD_FAILURE,
    error,
  }
}

export function dismissReviewSnackbar() {
  return {
    type: DISMISS_REVIEW_SNACKBAR,
  }
}

const initialSnackbarState = Map({
  isActive: false,
  error: '',
})

function snackbar(state = initialSnackbarState, action) {
  switch(action.type) {
    case GRADING_CARD_FAILURE:
      return state
        .set('isActive', true)
        .set('error', action.error)
    case DISMISS_REVIEW_SNACKBAR:
      return state
        .set('isActive', false)
        .set('error', '')
    default:
      return state
  }
}

// Reducers
const initialState = Map({
  currentCardId: '',
  isAnswerVisible: false,
  isGradingCard: false,
  gradingError: '',
  snackbar: snackbar(undefined, { type: undefined }),
})

export default function review(state = initialState, action) {
  switch(action.type) {
    case SET_CURRENT_CARD:
      return state
        .set('currentCardId', action.cardId)
        .set('isAnswerVisible', false)
    case TOGGLE_ANSWER_VISIBLE:
      return state.set('isAnswerVisible', !state.get('isAnswerVisible'))
    case GRADING_CARD:
      return state.set('isGradingCard', true)
    case GRADING_CARD_SUCCESS:
      return state
        .set('isGradingCard', false)
        .set('gradingError', '')
    case GRADING_CARD_FAILURE:
      return state
        .set('isGradingCard', false)
        .set('gradingError', action.error)
        .set('snackbar', snackbar(state.get('snackbar'), action))
    case DISMISS_REVIEW_SNACKBAR:
      return state.set('snackbar', snackbar(state.get('snackbar'), action))
    default:
      return state
  }
}

