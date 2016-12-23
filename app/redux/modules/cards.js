import { Map } from 'immutable'

const SETTING_CARDS_LISTENER = 'SETTING_CARDS_LISTENER'
const SETTING_CARDS_LISTENER_SUCCESS = 'SETTING_CARDS_LISTENER_SUCCESS'
const SETTING_CARDS_LISTENER_FAILURE = 'SETTING_CARDS_LISTENER_FAILURE'

function settingCardsListener() {
  return {
    type: SETTING_CARDS_LISTENER
  }
}

function settingCardsListenerSuccess(cards) {
  return {
    type: SETTING_CARDS_LISTENER_SUCCESS
  }
}

function settingCardsListenerFailure(error) {
  return {
    type: SETTING_CARDS_LISTENER_FAILURE,
    error
  }
}

const initialState = Map({
  isFetching: false,
  error: '',
  cards: Map({})
})

export default function cards(state = initialState, action) {
  switch(action.type) {
    case SETTING_CARDS_LISTENER:
      return state
        .set('isFetching', true)
        .set(error, '')
    case SETTING_CARDS_LISTENER_SUCCESS:
      return state
        .set('isFetching', false)
        .set(error, '')
        .set(cards, Map({action.cards}))
    case SETTING_CARDS_LISTENER_FAILURE:
      return state
        .set('isFetching', false)
        .set('error', action.error)
    default:
      return state
  }
}