import { Map } from 'immutable'
import { setDecksListener } from 'helpers/firebase'
import { addListener } from 'redux/modules/listeners'

const SETTING_DECKS_LISTENER = 'SETTING_DECKS_LISTENER'
const SETTING_DECKS_LISTENER_SUCCESS = 'SETTING_DECKS_LISTENER_SUCCESS'
const SETTING_DECKS_LISTENER_FAILURE = 'SETTING_DECKS_LISTENER_FAILURE'

export function setAndHandleDecksListener() {
  // TODO: Right now we get the whole decks snapshop every time it changes.
  //       We should just subscribe to the data that actually changed, instead.
  return (dispatch, getState) => {
    if (getState().listeners.get('decks') === true) {
      return
    }

    dispatch(addListener('decks'))
    dispatch(settingDecksListener())

    setDecksListener(
      (decks) => {
        dispatch(settingDecksListenerSuccess(decks))
        // TODO: Add author information to decks, then add the author for each deck to redux users here
      },
      (error) => dispatch(settingDecksListenerFailure(error))
    )
  }
}

function settingDecksListener() {
  return {
    type: SETTING_DECKS_LISTENER
  }
}

function settingDecksListenerSuccess(decks) {
  return {
    type: SETTING_DECKS_LISTENER_SUCCESS,
    decks
  }
}

function settingDecksListenerFailure(error) {
  return {
    type: SETTING_DECKS_LISTENER_FAILURE,
    error
  }
}

const initialState = Map({
  isFetching: false,
  error: '',
  decks: {},
})

export default function decks(state = initialState, action) {
  switch (action.type) {
    case SETTING_DECKS_LISTENER:
      return state
        .set('isFetching', true)
        .set('error', '')
    case SETTING_DECKS_LISTENER_SUCCESS:
      return state
        .set('isFetching', false)
        .set('error', '')
        .set('decks', action.decks)
    case SETTING_DECKS_LISTENER_FAILURE:
      return state
        .set('isFetching', false)
        .set('error', action.error)
    default:
      return state
  }
}