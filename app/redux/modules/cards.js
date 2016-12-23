import { Map } from 'immutable'
import { setCardsListener } from 'helpers/firebase'
import { addListener } from 'redux/modules/listeners'

const SETTING_CARDS_LISTENER = 'SETTING_CARDS_LISTENER'
const SETTING_CARDS_LISTENER_SUCCESS = 'SETTING_CARDS_LISTENER_SUCCESS'
const SETTING_CARDS_LISTENER_FAILURE = 'SETTING_CARDS_LISTENER_FAILURE'

export function setAndHandleCardsListener() {
  // TODO: Right now we get the whole cards snapshop every time it changes.
  //       We should just subscribe to the data that actually changed, instead.
  return (dispatch, getState) => {
    if (getState().listeners.get('cards') === true) {
      return
    }

    dispatch(addListener('cards'))
    dispatch(settingCardsListener())

    setCardsListener(
      (cards) => {
        dispatch(settingCardsListenerSuccess(cards))
        // TODO: Add author information to cards, then add the author for each card to redux users here
      },
      (error) => dispatch(settingCardsListenerFailure(error))
    )
  }
}

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
        .set('error', '')
    case SETTING_CARDS_LISTENER_SUCCESS:
      return state
        .set('isFetching', false)
        .set('error', '')
        .set('cards', Map(action.cards))
    case SETTING_CARDS_LISTENER_FAILURE:
      return state
        .set('isFetching', false)
        .set('error', action.error)
    default:
      return state
  }
}