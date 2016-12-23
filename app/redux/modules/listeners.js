import { Map } from 'immutable'

const ADD_LISTENER = 'ADD_LISTENER'

export function addListener(id) {
  return {
    type: ADD_LISTENER,
    id,
  }
}

const initialState = Map({
})

export default function listeners(state = initialState, action) {
  switch(action.type) {
    case ADD_LISTENER:
      return state.set(action.id, true)
    default:
      return state
  }
}