import { Map } from 'immutable'

// actions
const USER_DECK_ADDED_RECEIVED = 'USER_DECK_ADDED_RECEIVED'
const USER_DECK_REMOVED_RECEIVED = 'USER_DECK_REMOVED_RECEIVED'
const SETTING_ADD_OR_REMOVE_USER_DECK_LISTENER_FAILURE = 'SETTING_ADD_OR_REMOVE_USER_DECK_LISTENER_FAILURE'
const SETTING_USER_VALUE_LISTENER = 'SETTING_USER_VALUE_LISTENER'
const SETTING_USER_VALUE_LISTENER_SUCCESS = 'SETTING_USER_VALUE_LISTENER_SUCCESS'
const SETTING_USER_VALUE_LISTENER_FAILURE = 'SETTING_USER_VALUE_LISTENER_FAILURE'
const UPDATE_USER = 'UPDATE_USER'
const USERS_LOGOUT = 'USERS_LOGOUT'

// action creators
export function userDeckAddedReceived(uid, deckId) {
  return {
    type: USER_DECK_ADDED_RECEIVED,
    uid,
    deckId,
  }
}

export function userDeckRemovedReceived(uid, deckId) {
  return {
    type: USER_DECK_REMOVED_RECEIVED,
    uid,
    deckId,
  }
}

export function settingAddOrRemoveUserDeckListenerFailure(uid, error) {
  return {
    type: SETTING_ADD_OR_REMOVE_USER_DECK_LISTENER_FAILURE,
    uid,
    error,
  }
}

export function settingUserValueListener(uid) {
  return {
    type: SETTING_USER_VALUE_LISTENER,
    uid,
  }
}

export function settingUserValueListenerSuccess(uid, user) {
  return {
    type: SETTING_USER_VALUE_LISTENER_SUCCESS,
    uid,
    user,
  }
}

export function settingUserValueListenerFailure(uid, error) {
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
