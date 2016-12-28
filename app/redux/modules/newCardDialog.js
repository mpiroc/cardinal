import { Map } from 'immutable'
import { saveNewCard } from 'helpers/firebase'

// actions
const UPDATE_NEW_CARD_SIDE1 = 'UPDATE_NEW_CARD_SIDE1'
const UPDATE_NEW_CARD_SIDE2 = 'UPDATE_NEW_CARD_SIDE2'
const OPEN_NEW_CARD_DIALOG = 'OPEN_NEW_CARD_DIALOG'
const CLOSE_NEW_CARD_DIALOG = 'CLOSE_NEW_CARD_DIALOG'
const SAVING_NEW_CARD = 'SAVING_NEW_CARD'
const SAVING_NEW_CARD_SUCCESS = 'SAVING_NEW_CARD_SUCCESS'
const SAVING_NEW_CARD_FAILURE = 'SAVING_NEW_CARD_FAILURE'
const DISMISS_NEW_CARD_SNACKBAR = 'DISMISS_NEW_CARD_SNACKBAR'

// thunks
export function saveAndHandleNewCard() {
  return async (dispatch, getState) => {
    dispatch(savingNewCard())

    try {
      const { newCardDialog } = getState()
      const deckId = newCardDialog.get('deckId')
      const side1 = newCardDialog.get('side1')
      const side2 = newCardDialog.get('side2')

      await saveNewCard(deckId, {
        side1,
        side2,
      })

      dispatch(savingNewCardSuccess())
    }
    catch (error) {
      dispatch(savingNewCardFailure(error.message))
    }
  }
}

// action creators
export function updateNewCardSide1(side1) {
  return {
    type: UPDATE_NEW_CARD_SIDE1,
    side1
  }
}

export function updateNewCardSide2(side2) {
  return {
    type: UPDATE_NEW_CARD_SIDE2,
    side2
  }
}

export function openNewCardDialog(deckId) {
  return {
    type: OPEN_NEW_CARD_DIALOG,
    deckId
  }
}

export function closeNewCardDialog() {
  return {
    type: CLOSE_NEW_CARD_DIALOG
  }
}

function savingNewCard() {
  return {
    type: SAVING_NEW_CARD
  }
}

function savingNewCardSuccess() {
  return {
    type: SAVING_NEW_CARD_SUCCESS
  }
}

function savingNewCardFailure(error) {
  return {
    type: SAVING_NEW_CARD_FAILURE,
    error
  }
}

export function dismissNewCardSnackbar() {
  return {
    type: DISMISS_NEW_CARD_SNACKBAR,
  }
}

// reducers
const initialSnackbarState = Map({
  isActive: false,
  error: '',
})

function snackbar(state = initialSnackbarState, action) {
  switch(action.type) {
    case SAVING_NEW_CARD:
      return state
        .set('isActive', false)
        .set('error', '')
    case SAVING_NEW_CARD_SUCCESS:
      return state
        .set('isActive', false)
        .set('error', '')
    case SAVING_NEW_CARD_FAILURE:
      return state
        .set('isActive', true)
        .set('error', action.error)
    case DISMISS_NEW_CARD_SNACKBAR:
      // Don't reset 'error', so devs can still view it in the redux store.
      return state.set('isActive', false)
    default:
      return state
  }
}

const initialState = Map({
  isActive: false,
  deckId: '',
  side1: '',
  side2: '',
  isSaving: false,
  snackbar: snackbar(undefined, { type: undefined }),
})

export default function newCardDialog(state = initialState, action) {
  switch(action.type) {
    case UPDATE_NEW_CARD_SIDE1:
      return state.set('side1', action.side1)
    case UPDATE_NEW_CARD_SIDE2:
      return state.set('side2', action.side2)
    case OPEN_NEW_CARD_DIALOG:
      return state
        .set('isActive', true)
        .set('deckId', action.deckId)
    case CLOSE_NEW_CARD_DIALOG:
      return state.set('isActive', false)
    case SAVING_NEW_CARD:
      return state
        .set('isSaving', true)
        .set('snackbar', snackbar(state.get('snackbar'), action))
    case SAVING_NEW_CARD_SUCCESS:
      return state
        .set('isActive', false)
        .set('deckId', '')
        .set('side1', '')
        .set('side2', '')
        .set('isSaving', false)
        .set('snackbar', snackbar(state.get('snackbar'), action))
    case SAVING_NEW_CARD_FAILURE:
      return state
        .set('isSaving', false)
        .set('snackbar', snackbar(state.get('snackbar'), action))
    case DISMISS_NEW_CARD_SNACKBAR:
      return state
        .set('snackbar', snackbar(state.get('snackbar'), action))
    default:
      return state
  }
}