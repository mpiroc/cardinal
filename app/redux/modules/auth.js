import { Map } from 'immutable'
import { setAndHandleUserValueListener } from './users'
import {
  signInWithPopup,
  saveUser,
} from 'helpers/firebase'

// actions
const AUTHING_USER = 'AUTHING_USER'
const AUTHING_USER_SUCCESS = 'AUTHING_USER_SUCCESS'
const AUTHING_USER_FAILURE = 'AUTHING_USER_FAILURE'
const AUTH_USER = 'AUTH_USER'

// thunks
export function authAndSaveUser() {
  return async (dispatch, getState) => {
    dispatch(authingUser())

    try {
      const user = await signInWithPopup()
      await saveUser(user)

      dispatch(setAndHandleUserValueListener(user.uid))
      dispatch(authingUserSuccess(user.uid))
    }
    catch (error) {
      dispatch(authingUserFailure(error))
    }
  }
}

// action creators
function authingUser() {
  return {
    type: AUTHING_USER,
  }
}

function authingUserSuccess(uid) {
  return {
    type: AUTHING_USER_SUCCESS,
    uid,
  }
}

function authingUserFailure(error) {
  return {
    type: AUTHING_USER_FAILURE,
    error,
  }
}

export function authUser(uid) {
  return {
    type: AUTH_USER,
    uid,
  }
}


// auth reducer
const initialState = Map({
  isAuthing: true,
  isAuthed: false,
  authedUid: '',
  authError: '',
})

export default function auth(state = initialState, action) {
  switch(action.type) {
    case AUTHING_USER:
      return state
        .set('isAuthing', true)
        .set('isAuthed', false)
        .set('authedUid', '')
        .set('authError', '')
    case AUTHING_USER_SUCCESS:
    case AUTH_USER:
      return state
        .set('isAuthing', false)
        .set('isAuthed', true)
        .set('authedUid', action.uid)
        .set('authError', '')
    case AUTHING_USER_FAILURE:
      return state
        .set('isAuthing', false)
        .set('isAuthed', false)
        .set('authedUid', '')
        .set('authError', action.error)
    default:
      return state
  }
}
