import { Map } from 'immutable'
import {
  addUserValueListener,
  addUserDeckAddedListener,
  addUserDeckRemovedListener,
} from './listeners'
import {
  setUserValueListener,
  setUserDeckAddedListener,
  setUserDeckRemovedListener,
} from './helpers/firebase'

// actions
const ADD_USER_DECK = 'ADD_USER_DECK'
const REMOVE_USER_DECK = 'REMOVE_USER_DECK'
const SETTING_ADD_OR_REMOVE_USER_DECK_LISTENER_FAILURE = 'SETTING_ADD_OR_REMOVE_USER_DECK_LISTENER_FAILURE'
const SETTING_USER_VALUE_LISTENER = 'SETTING_USER_VALUE_LISTENER'
const SETTING_USER_VALUE_LISTENER_SUCCESS = 'SETTING_USER_VALUE_LISTENER_SUCCESS'
const SETTING_USER_VALUE_LISTENER_FAILURE = 'SETTING_USER_VALUE_LISTENER_FAILURE'

// thunks
export function setUserValueListener(uid) {
  return (dispatch, getState) => {
    const state = getState().listeners

    if (state.getIn(['users', uid]) !== true) {
      dispatch(addUserValueListener(uid))
      dispatch(settingUserValueListener(uid))
      setUserValueListener(
        uid,
        user => dispatch(settingUserValueListenerSuccess(uid, user)),
        error => dispatch(settingUserValueListenerFailure(uid, error)),
      )
    }
  }
}

export function setUserDeckAddedRemovedListeners(uid) {
  return (dispatch, getState) => {
    const state = getState().listeners

    if (state.getIn(['userDecks', uid, 'added']) !== true) {
      dispatch(addUserDeckAddedListener(uid))
      setUserDeckAddedListener(
        uid,
        deckId => dispatch(addUserDeck(uid, deckId)),
        error => dispatch(settingAddOrRemoveUserDeckListenerFailure(uid, error)),
      )
    }

    if (state.getIn(['userDecks', uid, 'removed']) !== true) {
      dispatch(addUserDeckRemovedListener(uid))
      setUserDeckRemovedListener(
        uid,
        deckId => dispatch(removeUserDeck(uid, deckId)),
        error => dispatch(settingAddOrRemoveUserDeckListenerFailure(uid, error)),
      )
    }
  }
}

// action creators
function addUserDeck(uid, deckId) {
  return {
    type: ADD_USER_DECK,
    uid,
    deckId,
  }
}

function removeUserDeck(uid, deckId) {
  return {
    type: REMOVE_USER_DECK,
    uid,
    deckId,
  }
}

function settingAddOrRemoveUserDeckListenerFailure(uid, error) {
  return {
    type: SETTING_ADD_OR_REMOVE_USER_DECK_LISTENER_FAILURE,
    uid,
    error,
  }
}

function settingUserValueListener(uid) {
  return {
    type: SETTING_USER_VALUE_LISTENER,
    uid,
  }
}

function settingUserValueListenerSuccess(uid, user) {
  return {
    type: SETTING_USER_VALUE_LISTENER_SUCCESS,
    uid,
    user,
  }
}

function settingUserValueListenerFailure(uid, error) {
  return {
    type: SETTING_USER_VALUE_LISTENER_FAILURE,
    uid,
    error,
  }
}

// user reducer
const initialUserState = Map({
  isLoading: true,
  loadingError: '',
  addOrRemoveError: '',

  uid: '',
  name: '',
  decks: Map(),
})

function user(state = initialUserState, action) {
  switch(action.type) {
    case UPDATE_USER_VALUE:
      return state.merge(action.user)
    case ADD_USER_DECK:
      return state.setIn(['decks', action.deckId], true)
    case REMOVE_USER_DECK:
      return state.deleteIn(['decks', action.deckId])
    case SETTING_ADD_OR_REMOVE_USER_DECK_LISTENER_FAILURE:
      return state.set('addOrRemoveError', action.error)
    case SETTING_USER_VALUE_LISTENER:
      return state
        .set('isLoading', true)
        .set('loadingError', '')
    case SETTING_USER_VALUE_LISTENER_SUCCESS:
      // TODO: Can action.user be null?
      return state
        .set('isLoading', false)
        .set('loadingError', '')
        .merge(action.user)
    case SETTING_USER_VALUE_LISTENER_FAILURE:
      return state
        .set('isLoading', false)
        .set('loadingError', action.error)
    default:
      return state
  }
}

// users reducer
const initialState = Map({
  users: Map(),
})

export default function users(state = initialState, action) {
  switch(action.type) {
    case ADD_USER_DECK:
    case REMOVE_USER_DECK:
    case SETTING_ADD_OR_REMOVE_USER_DECK_LISTENER_FAILURE:
    case SETTING_USER_VALUE_LISTENER:
    case SETTING_USER_VALUE_LISTENER_SUCCESS:
    case SETTING_USER_VALUE_LISTENER_FAILURE:
      const path = ['users', action.uid]
      return state.setIn(path, user(state.getIn(path), action))
    default:
      return state
  }
}
