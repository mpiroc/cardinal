import { Map } from 'immutable'
import moment from 'moment'
import { getRandomInt } from 'helpers/random'

// Actions
const SET_CURRENT_CARD = 'SET_CURRENT_CARD'
const TOGGLE_ANSWER_VISIBLE = 'TOGGLE_ANSWER_VISIBLE'

// thunks
export function showNextCard(deckId) {
  return (dispatch, getState, firebaseContext) => {
    const { cards, decks, review } = getState()

    const now = moment()

    const currentCardId = review.get('currentCardId')
    const cardIds = decks
      .getIn(['decks', deckId, 'cards'])
      .keySeq()
      .filter(cardId =>
        cardId !== currentCardId && (
          cards.getIn(['cards', cardId, 'history', 'grade']) <= 2 ||
          moment(
            cards.getIn(['cards', cardId, 'history', 'nextReviewMoment']),
            'milliseconds'
          ).isBefore(now)
        )
      )

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

// Reducers
const initialState = Map({
  currentCardId: '',
  isAnswerVisible: false,
})

export default function review(state = initialState, action) {
  switch(action.type) {
    case SET_CURRENT_CARD:
      return state
        .set('currentCardId', action.cardId)
        .set('isAnswerVisible', false)
    case TOGGLE_ANSWER_VISIBLE:
      return state.set('isAnswerVisible', !state.get('isAnswerVisible'))
    default:
      return state
  }
}

