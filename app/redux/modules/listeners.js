import { Map } from 'immutable'
import {
  setDataListener,
  removeDataListener,
} from 'helpers/firebase'

// actions
const SET_DATA_LISTENER_FLAG = 'SET_DATA_LISTENER_FLAG'
const REMOVE_DATA_LISTENER_FLAG = 'REMOVE_DATA_LISTENER_FLAG'
const SET_AUTH_STATE_CHANGED_LISTENER = 'SET_AUTH_STATE_CHANGED_LISTENER'

// thunks
export function setDataListenerAndFlag(path, event, onSuccess, onFailure) {
  return (dispatch, getState, firebaseContext) => {
    const { listeners } = getState()

    if (listeners.getIn(['data', path, event]) === true) {
      return
    }

    setDataListener(firebaseContext, path, event, onSuccess, onFailure)
    setDataListenerFlag(path, event)
  }
}

export function removeAllDataListenersAndFlags() {
  return (dispatch, getState, firebaseContext) => {
    const { listeners } = getState()

    listeners.get('data').forEach((data, path) => {
      data.keySeq().forEach((event) => {
        removeDataListener(firebaseContext, path, event)
        removeDataListenerFlag(path, event)
      })
    })
  }
}

// action creators
function setDataListenerFlag(path, event) {
  return {
    type: SET_DATA_LISTENER_FLAG,
    path,
    event,
  }
}

function removeDataListenerFlag(path, event) {
  return {
    type: REMOVE_DATA_LISTENER_FLAG,
    path,
    event,
  }
}

export function setAuthStateChangedListenerFlag() {
  return {
    type: SET_AUTH_STATE_CHANGED_LISTENER
  }
}

function dataListener(state = Map(), action) {
  switch(action.type) {
    case SET_DATA_LISTENER:
      return state.set(action.event, true)
    case REMOVE_DATA_LISTENER:
      return state.remove(action.event)
    default:
      return state
  }
}

const initialState = Map({
  authStateChanged: false,
  data: Map(),
})

export default function listeners(state = initialState, action) {
  switch(action.type) {
    case SET_DATA_LISTENER_FLAG:
    case REMOVE_DATA_LISTENER_FLAG:
      const path = ['data', action.path]
      return state.setIn(path, dataListener(state.getIn(path), action))
    case SET_AUTH_STATE_CHANGED_LISTENER:
      return state.set('authStateChanged', true)
    default:
      return state
  }
}
