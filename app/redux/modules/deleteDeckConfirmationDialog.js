import { Map } from 'immutable'
import { deleteAndHandleDeck } from 'redux/modules/decks'

// Actions
const OPEN_DELETE_DECK_CONFIRMATION_DIALOG = 'OPEN_DELETE_DECK_CONFIRMATION_DIALOG'
const CLOSE_DELETE_DECK_CONFIRMATION_DIALOG = 'CLOSE_DELETE_DECK_CONFIRMATION_DIALOG'

// Thunks
export function closeDialogAndDeleteDeck() {
  return (dispatch, getState, firebaseContext) => {
    const { auth, deleteDeckConfirmationDialog } = getState()
    const uid = auth.get('authedUid')
    const deckId = deleteDeckConfirmationDialog.get('deckId')

    // No need to await the result here--progress will be shown in the
    // DeckRTCard, and errors will be shown in the Decks snackbar.
    dispatch(deleteAndHandleDeck(uid, deckId))

    dispatch(closeDeleteDeckConfirmationDialog())
  }
}

// Action creators
export function openDeleteDeckConfirmationDialog(deckId, name, cardCount) {
  return {
    type: OPEN_DELETE_DECK_CONFIRMATION_DIALOG,
    deckId,
    name,
    cardCount,
  }
}

export function closeDeleteDeckConfirmationDialog() {
  return {
    type: CLOSE_DELETE_DECK_CONFIRMATION_DIALOG,
  }
}

// Reducers
const initialState = Map({
  isActive: false,
  deckId: '',
  name: '',
  cardCount: undefined,
})

export default function deleteDeckConfirmationDialog(state = initialState, action) {
  switch(action.type) {
    case OPEN_DELETE_DECK_CONFIRMATION_DIALOG:
      return state
        .set('isActive', true)
        .set('deckId', action.deckId)
        .set('name', action.name)
        .set('cardCount', action.cardCount)
    case CLOSE_DELETE_DECK_CONFIRMATION_DIALOG:
      // Don't reset name or cardCount, because the dialog message will remain
      // visible briefly while the dialog is fading out of view.
      return state
        .set('isActive', false)
        .set('deckId', '')
    default:
      return state
  }
}