import { Map } from 'immutable'

// actions
const UPDATE_NEW_DECK_NAME = 'UPDATE_NEW_DECK_NAME'
const UPDATE_NEW_DECK_DESCRIPTION = 'UPDATE_NEW_DECK_DESCRIPTION'
const OPEN_NEW_DECK_DIALOG = 'OPEN_NEW_DECK_DIALOG'
const CLOSE_NEW_DECK_DIALOG = 'CLOSE_NEW_DECK_DIALOG'

// action creators
export function updateNewDeckName(name) {
  return {
    type: UPDATE_NEW_DECK_NAME,
    name
  }
}

export function updateNewDeckDescription(description) {
  return {
    type: UPDATE_NEW_DECK_DESCRIPTION,
    description
  }
}

export function openNewDeckDialog() {
  return {
    type: OPEN_NEW_DECK_DIALOG
  }
}

export function closeNewDeckDialog() {
  return {
    type: CLOSE_NEW_DECK_DIALOG
  }
}

// reducers
const initialState = Map({
  isActive: false,
  name: '',
  description: '',
})

export default function newDeckDialog(state = initialState, action) {
  switch(action.type) {
    case UPDATE_NEW_DECK_NAME:
      return state.set('name', action.name)
    case UPDATE_NEW_DECK_DESCRIPTION:
      return state.set('description', action.description)
    case OPEN_NEW_DECK_DIALOG:
      return state.set('isActive', true)
    case CLOSE_NEW_DECK_DIALOG:
      return state.set('isActive', false)
    default:
      return state
  }
}