import { Map } from 'immutable'

const UPDATE_USER_VALUE = 'UPDATE_USER_VALUE'

function updateUserValue(user) {
  return {
    type: UPDATE_USER_VALUE,
    user,
  }
}

const initialUserState = Map({
  uid: '',
  name: '',
})

function user(state = initialUserState, action) {
  switch(action.type) {
    case UPDATE_USER_VALUE:
      return state.merge(action.user)
    default:
      return state
  }
}

const initialState = Map({
  users: Map(),
})

export default function users(state = initialState, action) {
  switch(action.type) {
    case UPDATE_USER_VALUE:
      const path = ['users', action.user.uid]
      return state.setIn(path, user(state.getIn(path), action.user))
    default:
      return state
  }
}
