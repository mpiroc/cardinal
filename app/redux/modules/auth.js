import { Map } from 'immutable'
import { replace } from 'react-router-redux'
import {
  signInWithPopup,
  signOut,
  setAuthStateChangedListener as firebaseSetAuthStateChangedListener,
  saveUser
} from 'helpers/firebase'
import {
  addAuthStateChangedListenerFlag,
} from 'redux/modules/listeners'
import {
  disableAndRemoveAllListeners,
  setAndHandleUserValueListener,
} from 'redux/modules/firebase'
import { usersLogout, saveAndHandleUser } from 'redux/modules/users'
import { decksLogout } from 'redux/modules/decks'
import { cardsLogout } from 'redux/modules/cards'
import { setLoginRedirect, clearLoginRedirect } from 'redux/modules/loginRedirect'

// actions
const AUTHING_USER = 'AUTHING_USER'
const AUTHING_USER_SUCCESS = 'AUTHING_USER_SUCCESS'
const AUTHING_USER_FAILURE = 'AUTHING_USER_FAILURE'
const AUTH_USER = 'AUTH_USER'
const UNAUTH_USER = 'UNAUTH_USER'

// thunks
export function authAndSaveUser() {
  return async (dispatch, getState, firebaseContext) => {
    dispatch(authingUser())

    try {
      const user = await signInWithPopup(firebaseContext)
      await saveUser(firebaseContext, user)

      dispatch(setAndHandleUserValueListener(user.uid))
      dispatch(authingUserSuccess(user.uid))
      dispatch(replace('/decks'))
    }
    catch (error) {
      dispatch(authingUserFailure(error))
    }
  }
}

export function signOutAndUnauth() {
  return async (dispatch, getState, firebaseContext) => {
    dispatch(disableAndRemoveAllListeners())
    await signOut(firebaseContext)

    dispatch(unauthUser())
    dispatch(usersLogout())
    dispatch(decksLogout())
    dispatch(cardsLogout())

    dispatch(replace('/'))
  }
}

export function setAuthStateChangedListener() {
  return (dispatch, getState, firebaseContext) => {
    if (getState().listeners.get('authStateChanged') === true) {
      return
    }

    dispatch(addAuthStateChangedListenerFlag())

    firebaseSetAuthStateChangedListener(firebaseContext, async firebaseUser => {
      if (firebaseUser) {
        const user = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName,
        }

        await saveUser(firebaseContext, user)
        dispatch(authUser(user.uid))
        dispatch(setAndHandleUserValueListener(user.uid))

        dispatch(redirectFromAuthResult(true))
      }
      else {
        dispatch(unauthUser())
        dispatch(redirectFromAuthResult(false))
      }
    })
  }
}

function redirectFromAuthResult(authResult) {
  return (dispatch, getState, firebaseContext) => {
    const { loginRedirect, routing } = getState()
    const loginRedirectPath = loginRedirect.get('redirect')
    const currentPath = routing.locationBeforeTransitions.pathname

    if (authResult === true && (currentPath === '/login' || currentPath === '/')) {
      if (loginRedirectPath !== undefined) {
        dispatch(replace(loginRedirectPath))
        dispatch(clearLoginRedirect())
      }
      else {
        dispatch(replace('/decks'))
      }
    }

    if (authResult === false && currentPath !== '/login') {
      if (loginRedirectPath === undefined) {
        dispatch(setLoginRedirect(currentPath))
      }

      dispatch(replace('/login'))
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

export function unauthUser() {
  return {
    type: UNAUTH_USER
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
