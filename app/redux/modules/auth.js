import { Map } from 'immutable'
import {
  signInWithPopup,
  signOut,
  setAuthStateChangedListener as firebaseSetAuthStateChangedListener,
  saveUser
} from 'helpers/firebase'
import { addAuthStateChangedListener, disableAndRemoveAllListeners } from 'redux/modules/listeners'
import { usersLogout, saveAndHandleUser, setAndHandleUserValueListener } from 'redux/modules/users'
import { decksLogout } from 'redux/modules/decks'
import { cardsLogout } from 'redux/modules/cards'
import { clearLoginRedirect } from 'redux/modules/loginRedirect'

// actions
const AUTHING_USER = 'AUTHING_USER'
const AUTHING_USER_SUCCESS = 'AUTHING_USER_SUCCESS'
const AUTHING_USER_FAILURE = 'AUTHING_USER_FAILURE'
const AUTH_USER = 'AUTH_USER'
const UNAUTH_USER = 'UNAUTH_USER'

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

export function signOutAndUnauth() {
  return async (dispatch, getState) => {
    disableAndRemoveAllListeners()
    await signOut()

    dispatch(unauthUser())
    dispatch(usersLogout())
    dispatch(decksLogout())
    dispatch(cardsLogout())
  }
}

export function setAuthStateChangedListener(replace) {
  return (dispatch, getState) => {
    if (getState().listeners.get('authStateChanged') === true) {
      return
    }

    dispatch(addAuthStateChangedListener())

    firebaseSetAuthStateChangedListener(async firebaseUser => {
      if (firebaseUser) {
        const user = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName,
        }

        await saveUser(user)
        dispatch(authUser(user.uid))
        dispatch(setAndHandleUserValueListener(user.uid))

        const loginRedirect = getState().loginRedirect.get('redirect')

        if (loginRedirect) {
          dispatch(clearLoginRedirect())
          replace(loginRedirect)
        }
        else {
          replace('/')
        }
      }
    })
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

export function unauthUser() {
  return {
    type: UNAUTH_USER
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
    case UNAUTH_USER:
      return state
        .set('isAuthing', false)
        .set('isAuthed', false)
        .set('authedUid', '')
        .set('authError', '')
    default:
      return state
  }
}
