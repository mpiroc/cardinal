import { Map } from 'immutable'
import { setUserValueListener } from './users'
import {
  signInWithPopup,
  saveUser,
} from './helpers/firebase'

// actions
const AUTHING_USER = 'AUTHING_USER'
const AUTHING_USER_SUCCESS = 'AUTHING_USER_SUCCESS'
const AUTHING_USER_FAILURE = 'AUTHING_USER_FAILURE'

// thunks
export function authAndSaveUser() {
  return async (dispatch, getState) => {
    dispatch(authingUser())

    try {
      const user = await signInWithPopup()
      await saveUser(user)

      dispatch(setUserValueListener(user.uid))
      dispatch(authingUserSuccess(user))
    }
    catch (error) {
      dispatch(authingUserFailure(user))
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

// auth reducer
const initialState = Map({
  isAuthing: true,
  authedUid: '',
  authError: '',
})

export default function auth(state = initialState, action) {
  switch(action.type) {
    case AUTHING_USER:
      return state
        .set('isAuthing', true)
        .set('authedUid', '')
        .set('authError', '')
    case AUTHING_USER_SUCCESS:
      return state
        .set('isAuthing', false)
        .set('authedUid', action.uid)
        .set('authError', '')
    case AUTHING_USER_FAILURE:
      return state
        .set('isAuthing', false)
        .set('authedUid', '')
        .set('authError', action.error)
    default:
      return state
  }
}
