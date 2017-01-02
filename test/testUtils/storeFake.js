import { Map } from 'immutable'

const cardsState = Map({
  cards: Map({
    "myCardId": Map({
      isDeleting: false,
      side1: 'side one',
      side2: 'side two',
    })
  })  
})

const editCardDialogState = Map({
  isActive: false,
  isSaving: false,
  deckId: 'myDeckId',
  cardId: 'myCardId',
  side1: '',
  side2: '',
  snackbar: Map({
    isActive: false,
    error: ''
  })
})

const store = {
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => {
    return {
      cards: cardsState,
      editCardDialog: editCardDialogState,
    }
  }
}

export default store