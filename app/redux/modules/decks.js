import { Map } from 'immutable'

const CREATING_DECK = 'CREATING_DECK'
const CREATING_DECK_SUCCESS = 'CREATING_DECK_SUCCESS'
const CREATING_DECK_FAILURE = 'CREATING_DECK_FAILURE'

const initialState = Map({
  isFetching: false,
  error: '',
  decks: {},
})

export default function decks(state = initialState, action) {
  switch (action.type) {
    case CREATING_DECK:
      return state
    case CREATING_DECK_SUCCESS:
      return state
    case CREATING_DECK_FAILURE:
      return state
    default:
      return state
  }
}