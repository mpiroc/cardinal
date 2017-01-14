import { Map } from 'immutable'
import { deleteAndHandleCard } from 'redux/modules/cards'

// Actions
const OPEN_DELETE_CARD_CONFIRMATION_DIALOG = 'OPEN_DELETE_CARD_CONFIRMATION_DIALOG'
const CLOSE_DELETE_CARD_CONFIRMATION_DIALOG = 'CLOSE_DELETE_CARD_CONFIRMATION_DIALOG'

// Thunks
export function closeDialogAndDeleteCard() {
  return (dispatch, getState, firebaseContext) => {
    const { deleteCardConfirmationDialog } = getState()
    const deckId = deleteCardConfirmationDialog.get('deckId')
    const cardId = deleteCardConfirmationDialog.get('cardId')

    // No need to await the result here--progress will be shown in the
    // CardRTCard, and errors will be shown in the Cards snackbar.
    dispatch(deleteAndHandleCard(deckId, cardId))

    dispatch(closeDeleteCardConfirmationDialog())
  }
}

// Action creators
export function openDeleteCardConfirmationDialog(deckId, cardId) {
  return {
    type: OPEN_DELETE_CARD_CONFIRMATION_DIALOG,
    deckId,
    cardId,
  }
}

export function closeDeleteCardConfirmationDialog() {
  return {
    type: CLOSE_DELETE_CARD_CONFIRMATION_DIALOG,
  }
}

// Reducers
const initialState = Map({
  isActive: false,
  deckId: '',
  cardId: '',
})

export default function deleteCardConfirmationDialog(state = initialState, action) {
  switch(action.type) {
    case OPEN_DELETE_CARD_CONFIRMATION_DIALOG:
      return state
        .set('isActive', true)
        .set('deckId', action.deckId)
        .set('cardId', action.cardId)
    case CLOSE_DELETE_CARD_CONFIRMATION_DIALOG:
      return initialState
    default:
      return state
  }
}