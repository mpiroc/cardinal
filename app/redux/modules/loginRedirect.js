import { Map } from 'immutable'

// Actions
const SET_LOGIN_REDIRECT = 'SET_LOGIN_REDIRECT'
const CLEAR_LOGIN_REDIRECT = 'CLEAR_LOGIN_REDIRECT'

// Action creators
export function setLoginRedirect(redirect) {
  return {
    type: SET_LOGIN_REDIRECT,
    redirect,
  }
}

export function clearLoginRedirect() {
  return {
    type: CLEAR_LOGIN_REDIRECT,
  }
}

// Reducers
const initialState = Map({
  redirect: undefined
})

export default function loginRedirect(state = initialState, action) {
  switch(action.type) {
    case SET_LOGIN_REDIRECT:
      return state.set('redirect', action.redirect)
    case CLEAR_LOGIN_REDIRECT:
      return state.set('redirect', undefined)
    default:
      return state
  }
}