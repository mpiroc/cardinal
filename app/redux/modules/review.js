import { Map } from 'immutable'
import moment from 'moment'
import { getRandomInt } from 'helpers/random'
import {
  computeNewDifficulty,
  computeNewRepetitionCount,
  computeNextReviewMs,
  isDue,
} from 'helpers/superMemo2'

// Actions
const SET_CURRENT_CARD = 'SET_CURRENT_CARD'
const TOGGLE_ANSWER_VISIBLE = 'TOGGLE_ANSWER_VISIBLE'
const GRADING_CARD = 'GRADING_CARD'
const GRADING_CARD_SUCCESS = 'GRADING_CARD_SUCCESS'
const GRADING_CARD_FAILURE = 'GRADING_CARD_FAILURE'

// thunks
export function gradeCard(grade) {
  return async (dispatch, getState, firebaseContext) => {
    // TODO
    dispatch(gradingCard())

    try {
      const { cards, review } = getState()
      const cardId = review.get('currentCardId')
      if (!cardId) {
        throw new Error('Cannot grade card when there is no current card.')
      }

      const history = cards.getIn(['cards', cardId, 'history'])
      const oldDifficulty = history.get('difficulty')
      const oldRepetitionCount = history.get('repetitionCount')
      const oldPreviousReviewMs = history.get('previousReviewMs')


    }
    catch (error) {
      dispatch(gradingCardFailure(error.message))
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

// Reducers
const initialState = Map({
  currentCardId: '',
  isAnswerVisible: false,
  isGradingCard: false,
  gradingError: '',
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
    default:
      return state
  }
}

