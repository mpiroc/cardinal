import { Map } from 'immutable'

// Actions
const SET_CURRENT_CARD = 'SET_CURRENT_CARD'
const TOGGLE_ANSWER_VISIBLE = 'TOGGLE_ANSWER_VISIBLE'

// thunks
export function showNextCard(deckID) {
  return (dispatch, getState) => {
    
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

