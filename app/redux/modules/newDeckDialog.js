import { Map } from 'immutable'
import { saveNewDeck } from 'helpers/firebase'

// actions
const UPDATE_NEW_DECK_NAME = 'UPDATE_NEW_DECK_NAME'
const UPDATE_NEW_DECK_DESCRIPTION = 'UPDATE_NEW_DECK_DESCRIPTION'
const OPEN_NEW_DECK_DIALOG = 'OPEN_NEW_DECK_DIALOG'
const CLOSE_NEW_DECK_DIALOG = 'CLOSE_NEW_DECK_DIALOG'
const SAVING_NEW_DECK = 'SAVING_NEW_DECK'
const SAVING_NEW_DECK_SUCCESS = 'SAVING_NEW_DECK_SUCCESS'
const SAVING_NEW_DECK_FAILURE = 'SAVING_NEW_DECK_FAILURE'
const DISMISS_NEW_DECK_SNACKBAR = 'DISMISS_NEW_DECK_SNACKBAR'

// thunks
export function saveAndHandleNewDeck() {
  return async (dispatch, getState) => {
    dispatch(savingNewDeck())

    try {
      const { auth, newDeckDialog } = getState()
      const uid = auth.get('authedUid')
      const name = newDeckDialog.get('name')
      const description = newDeckDialog.get('description')

      await saveNewDeck(uid, {
        name,
        description,
      })

      dispatch(savingNewDeckSuccess())
    }
    catch (error) {
      dispatch(savingNewDeckFailure(error.message))
    }
  }
}

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

function savingNewDeck() {
  return {
    type: SAVING_NEW_DECK
  }
}

function savingNewDeckSuccess() {
  return {
    type: SAVING_NEW_DECK_SUCCESS
  }
}

function savingNewDeckFailure(error) {
  return {
    type: SAVING_NEW_DECK_FAILURE,
    error
  }
}

export function dismissNewDeckSnackbar() {
  return {
    type: DISMISS_NEW_DECK_SNACKBAR,
  }
}

// reducers
const initialSnackbarState = Map({
  isActive: false,
  error: '',
})

function snackbar(state = initialSnackbarState, action) {
  switch(action.type) {
    case SAVING_NEW_DECK:
      return state
        .set('isActive', false)
        .set('error', '')
    case SAVING_NEW_DECK_SUCCESS:
      return state
        .set('isActive', false)
        .set('error', '')
    case SAVING_NEW_DECK_FAILURE:
      return state
        .set('isActive', true)
        .set('error', action.error)
    case DISMISS_NEW_DECK_SNACKBAR:
      // Don't reset 'error', so devs can still view it in the redux store.
      return state.set('isActive', false)
    default:
      return state
  }
}

const initialState = Map({
  isActive: false,
  name: '',
  description: '',
  isSaving: false,
  snackbar: snackbar(undefined, { type: undefined }),
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
    case SAVING_NEW_DECK:
      return state
        .set('isSaving', true)
        .set('snackbar', snackbar(state.get('snackbar'), action))
    case SAVING_NEW_DECK_SUCCESS:
      return state
        .set('isActive', false)
        .set('name', '')
        .set('description', '')
        .set('isSaving', false)
        .set('snackbar', snackbar(state.get('snackbar'), action))
    case SAVING_NEW_DECK_FAILURE:
      return state
        .set('isSaving', false)
        .set('snackbar', snackbar(state.get('snackbar'), action))
    case DISMISS_NEW_DECK_SNACKBAR:
      return state
        .set('snackbar', snackbar(state.get('snackbar'), action))
    default:
      return state
  }
}