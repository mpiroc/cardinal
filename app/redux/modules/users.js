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
} from 'helpers/firebase'
import {
  setDeckValueListener,
  updateDeck,
  removeDeck,
} from './decks'

// actions
const USER_DECK_ADDED_RECEIVED = 'USER_DECK_ADDED_RECEIVED'
const USER_DECK_REMOVED_RECEIVED = 'USER_DECK_REMOVED_RECEIVED'
const SETTING_ADD_OR_REMOVE_USER_DECK_LISTENER_FAILURE = 'SETTING_ADD_OR_REMOVE_USER_DECK_LISTENER_FAILURE'
const SETTING_USER_VALUE_LISTENER = 'SETTING_USER_VALUE_LISTENER'
const SETTING_USER_VALUE_LISTENER_SUCCESS = 'SETTING_USER_VALUE_LISTENER_SUCCESS'
const SETTING_USER_VALUE_LISTENER_FAILURE = 'SETTING_USER_VALUE_LISTENER_FAILURE'
const UPDATE_USER = 'UPDATE_USER'
const USERS_LOGOUT = 'USERS_LOGOUT'

// thunks
export function setAndHandleUserValueListener(uid) {
  return (dispatch, getState, firebaseContext) => {
    const state = getState().listeners

    if (state.getIn(['users', uid]) !== true) {
      dispatch(addUserValueListener(uid))
      dispatch(settingUserValueListener(uid))
      setUserValueListener(
        firebaseContext,
        uid,
        user => dispatch(settingUserValueListenerSuccess(uid, user)),
        error => dispatch(settingUserValueListenerFailure(uid, error)),
      )
    }
  }
}

export function setUserDeckCollectionListeners(uid) {
  return (dispatch, getState, firebaseContext) => {
    const state = getState().listeners

    if (state.getIn(['userDecks', uid, 'added']) !== true) {
      dispatch(addUserDeckAddedListener(uid))
      setUserDeckAddedListener(
        firebaseContext,
        uid,
        deck => {
          dispatch(userDeckAddedReceived(uid, deck.deckId))
          dispatch(updateDeck(deck.deckId, deck))
          dispatch(setDeckValueListener(uid, deck.deckId))
        },
        error => dispatch(settingAddOrRemoveUserDeckListenerFailure(uid, error)),
      )
    }

    if (state.getIn(['userDecks', uid, 'removed']) !== true) {
      dispatch(addUserDeckRemovedListener(uid))
      setUserDeckRemovedListener(
        firebaseContext,
        uid,
        deck => {
          dispatch(userDeckRemovedReceived(uid, deck.deckId))
          // TODO: Also remove cards?
          dispatch(removeDeck(deck.deckId))
        },
        error => dispatch(settingAddOrRemoveUserDeckListenerFailure(uid, error)),
      )
    }
  }
}

// action creators
export function userDeckAddedReceived(uid, deckId) {
  return {
    type: USER_DECK_ADDED_RECEIVED,
    uid,
    deckId,
  }
}

function userDeckRemovedReceived(uid, deckId) {
  return {
    type: USER_DECK_REMOVED_RECEIVED,
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

export function updateUser(uid, user) {
  return {
    type: UPDATE_USER,
    uid,
    user,
  }
}

export function usersLogout(uid) {
  return {
    type: USERS_LOGOUT,
    uid,
  }
}

// user reducer
const initialUserState = Map({
  loadingError: '',
  addOrRemoveError: '',

  uid: '',
  name: '',
  decks: Map(),
})

function user(state = initialUserState, action) {
  switch(action.type) {
    case USER_DECK_ADDED_RECEIVED:
      return state.setIn(['decks', action.deckId], true)
    case USER_DECK_REMOVED_RECEIVED:
      return state.deleteIn(['decks', action.deckId])
    case SETTING_ADD_OR_REMOVE_USER_DECK_LISTENER_FAILURE:
      return state.set('addOrRemoveError', action.error)
    case SETTING_USER_VALUE_LISTENER:
      return state.set('loadingError', '')
    case SETTING_USER_VALUE_LISTENER_SUCCESS:
    case UPDATE_USER:
      // TODO: Can action.user be null?
      return state
        .set('loadingError', '')
        .merge(action.user)
    case SETTING_USER_VALUE_LISTENER_FAILURE:
      return state.set('loadingError', action.error)
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
    case USER_DECK_ADDED_RECEIVED:
    case USER_DECK_REMOVED_RECEIVED:
    case SETTING_ADD_OR_REMOVE_USER_DECK_LISTENER_FAILURE:
    case SETTING_USER_VALUE_LISTENER:
    case SETTING_USER_VALUE_LISTENER_SUCCESS:
    case SETTING_USER_VALUE_LISTENER_FAILURE:
    case UPDATE_USER:
      const path = ['users', action.uid]
      return state.setIn(path, user(state.getIn(path), action))
    case USERS_LOGOUT:
      return state.set('users', Map())
    default:
      return state
  }
}
