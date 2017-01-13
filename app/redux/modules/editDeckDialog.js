import { Map } from 'immutable'
import { saveExistingDeck } from 'helpers/firebase'

// actions
const UPDATE_EDIT_DECK_NAME = 'UPDATE_EDIT_DECK_NAME'
const UPDATE_EDIT_DECK_DESCRIPTION = 'UPDATE_EDIT_DECK_DESCRIPTION'
const OPEN_EDIT_DECK_DIALOG = 'OPEN_EDIT_DECK_DIALOG'
const CLOSE_EDIT_DECK_DIALOG = 'CLOSE_EDIT_DECK_DIALOG'
const SAVING_EDIT_DECK = 'SAVING_EDIT_DECK'
const SAVING_EDIT_DECK_SUCCESS = 'SAVING_EDIT_DECK_SUCCESS'
const SAVING_EDIT_DECK_FAILURE = 'SAVING_EDIT_DECK_FAILURE'
const DISMISS_EDIT_DECK_SNACKBAR = 'DISMISS_EDIT_DECK_SNACKBAR'

// thunks
export function saveAndHandleEditDeck() {
  return async (dispatch, getState, firebaseContext) => {
    dispatch(savingEditDeck())

    try {
      const { auth, editDeckDialog } = getState()
      const uid = auth.get('authedUid')
      const deckId = editDeckDialog.get('deckId')
      const name = editDeckDialog.get('name')
      const description = editDeckDialog.get('description')

      await saveExistingDeck(firebaseContext, uid, {
        deckId,
        name,
        description,
      })

      dispatch(savingEditDeckSuccess())
    }
    catch (error) {
      dispatch(savingEditDeckFailure(error.message))
    }
  }
}

// action creators
export function updateEditDeckName(name) {
  return {
    type: UPDATE_EDIT_DECK_NAME,
    name
  }
}

export function updateEditDeckDescription(description) {
  return {
    type: UPDATE_EDIT_DECK_DESCRIPTION,
    description
  }
}

export function openEditDeckDialog(deckId, name, description) {
  return {
    type: OPEN_EDIT_DECK_DIALOG,
    deckId,
    name,
    description,
  }
}

export function closeEditDeckDialog() {
  return {
    type: CLOSE_EDIT_DECK_DIALOG
  }
}

function savingEditDeck() {
  return {
    type: SAVING_EDIT_DECK
  }
}

function savingEditDeckSuccess() {
  return {
    type: SAVING_EDIT_DECK_SUCCESS
  }
}

function savingEditDeckFailure(error) {
  return {
    type: SAVING_EDIT_DECK_FAILURE,
    error
  }
}

export function dismissEditDeckSnackbar() {
  return {
    type: DISMISS_EDIT_DECK_SNACKBAR,
  }
}

// reducers
const initialSnackbarState = Map({
  isActive: false,
  error: '',
})

function snackbar(state = initialSnackbarState, action) {
  switch(action.type) {
    case SAVING_EDIT_DECK:
      return state
        .set('isActive', false)
        .set('error', '')
    case SAVING_EDIT_DECK_SUCCESS:
      return state
        .set('isActive', false)
        .set('error', '')
    case SAVING_EDIT_DECK_FAILURE:
      return state
        .set('isActive', true)
        .set('error', `Error saving existing deck: ${action.error}`)
    case DISMISS_EDIT_DECK_SNACKBAR:
      return state
        .set('isActive', false)
        .set('error', '')
    default:
      return state
  }
}

const initialState = Map({
  isActive: false,
  deckId: '',
  name: '',
  description: '',
  isSaving: false,
  snackbar: snackbar(undefined, { type: undefined }),
})

export default function editDeckDialog(state = initialState, action) {
  switch(action.type) {
    case UPDATE_EDIT_DECK_NAME:
      return state.set('name', action.name)
    case UPDATE_EDIT_DECK_DESCRIPTION:
      return state.set('description', action.description)
    case OPEN_EDIT_DECK_DIALOG:
      return state
        .set('isActive', true)
        .set('deckId', action.deckId)
        .set('name', action.name)
        .set('description', action.description)
    case CLOSE_EDIT_DECK_DIALOG:
      return state.set('isActive', false)
    case SAVING_EDIT_DECK:
      return state
        .set('isSaving', true)
        .set('snackbar', snackbar(state.get('snackbar'), action))
    case SAVING_EDIT_DECK_SUCCESS:
      return state
        .set('isActive', false)
        .set('deckId', '')
        .set('name', '')
        .set('description', '')
        .set('isSaving', false)
        .set('snackbar', snackbar(state.get('snackbar'), action))
    case SAVING_EDIT_DECK_FAILURE:
      return state
        .set('isSaving', false)
        .set('snackbar', snackbar(state.get('snackbar'), action))
    case DISMISS_EDIT_DECK_SNACKBAR:
      return state
        .set('snackbar', snackbar(state.get('snackbar'), action))
    default:
      return state
  }
}