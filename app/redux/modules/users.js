import { Map } from 'immutable'
import { signInWithPopup, saveUser } from 'helpers/firebase'

const AUTHING_USER = 'AUTHING_USER'
const AUTHING_USER_SUCCESS = 'AUTHING_USER_SUCCESS'
const AUTHING_USER_FAILURE = 'AUTHING_USER_FAILURE'

export function authAndSaveUser() {
  return async function(dispatch) {
    dispatch(authingUser())

    try {
      const user = await signInWithPopup()
      await saveUser(user)

      dispatch(authingUserSuccess(user))
    }
    catch (error) {
      dispatch(authingUserFailure(error.message))
    }
  }
}

function authingUser() {
  return {
    type: AUTHING_USER,
  }
}

function authingUserSuccess(user) {
  return {
    type: AUTHING_USER_SUCCESS,
    user,
  }
}

function authingUserFailure(error) {
  return {
    type: AUTHING_USER_FAILURE,
    error,
  }
}

const initalState = Map({
  isAuthing: false,
  authedUserId: '',
  error: '',
  users: Map({ })
})

export default function users(state = initalState, action) {
  switch (action.type) {
    case AUTHING_USER:
      return state.set('isAuthing', true)
    case AUTHING_USER_SUCCESS:
      return state
        .set('isAuthing', false)
        .setIn(['users', action.user.uid], action.user)
    case AUTHING_USER_FAILURE:
      return state
        .set('isAuthing', false)
        .set('error', action.error)
    default:
      return state
  }
}