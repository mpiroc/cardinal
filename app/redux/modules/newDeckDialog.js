import { Map } from 'immutable'

// actions
const OPEN_NEW_DECK_DIALOG = 'OPEN_NEW_DECK_DIALOG'
const CLOSE_NEW_DECK_DIALOG = 'CLOSE_NEW_DECK_DIALOG'

// action creators
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
})

export default function newDeckDialog(state = initialState, action) {
  switch(action.type) {
    case OPEN_NEW_DECK_DIALOG:
      return state.set('isActive', true)
    case CLOSE_NEW_DECK_DIALOG:
      return state.set('isActive', false)
    default:
      return state
  }
}