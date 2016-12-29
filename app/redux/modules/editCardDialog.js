import { Map } from 'immutable'
import { saveExistingCard } from 'helpers/firebase'

// actions
const UPDATE_EDIT_CARD_SIDE1 = 'UPDATE_EDIT_CARD_SIDE1'
const UPDATE_EDIT_CARD_SIDE2 = 'UPDATE_EDIT_CARD_SIDE2'
const OPEN_EDIT_CARD_DIALOG = 'OPEN_EDIT_CARD_DIALOG'
const CLOSE_EDIT_CARD_DIALOG = 'CLOSE_EDIT_CARD_DIALOG'
const SAVING_EDIT_CARD = 'SAVING_EDIT_CARD'
const SAVING_EDIT_CARD_SUCCESS = 'SAVING_EDIT_CARD_SUCCESS'
const SAVING_EDIT_CARD_FAILURE = 'SAVING_EDIT_CARD_FAILURE'
const DISMISS_EDIT_CARD_SNACKBAR = 'DISMISS_EDIT_CARD_SNACKBAR'

// thunks
export function saveAndHandleEditCard() {
  return async (dispatch, getState) => {
    dispatch(savingEditCard())

    try {
      const { auth, editCardDialog } = getState()
      const uid = auth.get('authedUid')
      const deckId = editCardDialog.get('deckId')
      const cardId = editCardDialog.get('cardId')
      const side1 = editCardDialog.get('side1')
      const side2 = editCardDialog.get('side2')

      await saveExistingCard(uid, deckId, {
        cardId,
        side1,
        side2,
      })

      dispatch(savingEditCardSuccess())
    }
    catch (error) {
      dispatch(savingEditCardFailure(error.message))
    }
  }
}

// action creators
export function updateEditCardSide1(side1) {
  return {
    type: UPDATE_EDIT_CARD_SIDE1,
    side1
  }
}

export function updateEditCardSide2(side2) {
  return {
    type: UPDATE_EDIT_CARD_SIDE2,
    side2
  }
}

export function openEditCardDialog(deckId, cardId, side1, side2) {
  return {
    type: OPEN_EDIT_CARD_DIALOG,
    deckId,
    cardId,
    side1,
    side2,
  }
}

export function closeEditCardDialog() {
  return {
    type: CLOSE_EDIT_CARD_DIALOG
  }
}

function savingEditCard() {
  return {
    type: SAVING_EDIT_CARD
  }
}

function savingEditCardSuccess() {
  return {
    type: SAVING_EDIT_CARD_SUCCESS
  }
}

function savingEditCardFailure(error) {
  return {
    type: SAVING_EDIT_CARD_FAILURE,
    error
  }
}

export function dismissEditCardSnackbar() {
  return {
    type: DISMISS_EDIT_CARD_SNACKBAR,
  }
}

// reducers
const initialSnackbarState = Map({
  isActive: false,
  error: '',
})

function snackbar(state = initialSnackbarState, action) {
  switch(action.type) {
    case SAVING_EDIT_CARD:
      return state
        .set('isActive', false)
        .set('error', '')
    case SAVING_EDIT_CARD_SUCCESS:
      return state
        .set('isActive', false)
        .set('error', '')
    case SAVING_EDIT_CARD_FAILURE:
      return state
        .set('isActive', true)
        .set('error', action.error)
    case DISMISS_EDIT_CARD_SNACKBAR:
      // Don't reset 'error', so devs can still view it in the redux store.
      return state.set('isActive', false)
    default:
      return state
  }
}

const initialState = Map({
  isActive: false,
  deckId: '',
  cardId: '',
  side1: '',
  side2: '',
  isSaving: false,
  snackbar: snackbar(undefined, { type: undefined }),
})

export default function editCardDialog(state = initialState, action) {
  switch(action.type) {
    case UPDATE_EDIT_CARD_SIDE1:
      return state.set('side1', action.side1)
    case UPDATE_EDIT_CARD_SIDE2:
      return state.set('side2', action.side2)
    case OPEN_EDIT_CARD_DIALOG:
      return state
        .set('isActive', true)
        .set('deckId', action.deckId)
        .set('cardId', action.cardId)
        .set('side1', action.side1)
        .set('side2', action.side2)
    case CLOSE_EDIT_CARD_DIALOG:
      return state.set('isActive', false)
    case SAVING_EDIT_CARD:
      return state
        .set('isSaving', true)
        .set('snackbar', snackbar(state.get('snackbar'), action))
    case SAVING_EDIT_CARD_SUCCESS:
      return state
        .set('isActive', false)
        .set('deckId', '')
        .set('cardId', '')
        .set('side1', '')
        .set('side2', '')
        .set('isSaving', false)
        .set('snackbar', snackbar(state.get('snackbar'), action))
    case SAVING_EDIT_CARD_FAILURE:
      return state
        .set('isSaving', false)
        .set('snackbar', snackbar(state.get('snackbar'), action))
    case DISMISS_EDIT_CARD_SNACKBAR:
      return state
        .set('snackbar', snackbar(state.get('snackbar'), action))
    default:
      return state
  }
}