import { Map } from 'immutable'
import { saveNewCard } from 'helpers/firebase'

const OPEN_NEW_CARD_MODAL = 'OPEN_NEW_CARD_MODAL'
const CLOSE_NEW_CARD_MODAL = 'CLOSE_NEW_CARD_MODAL'
const UPDATE_NEW_CARD_SIDE1 = 'UPDATE_NEW_CARD_SIDE1'
const UPDATE_NEW_CARD_SIDE2 = 'UPDATE_NEW_CARD_SIDE2'
const SAVING_NEW_CARD = 'SAVING_NEW_CARD'
const SAVING_NEW_CARD_SUCCESS = 'SAVING_NEW_CARD_SUCCESS'
const SAVING_NEW_CARD_FAILURE = 'SAVING_NEW_CARD_FAILURE'

export function saveAndHandleNewCard(deckId) {
  return async (dispatch, getState) => {
    dispatch(savingNewCard())

    try {
      const { newCardModal } = getState()
      const side1 = newCardModal.get('side1')
      const side2 = newCardModal.get('side2')
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

export function openNewCardModal() {
  return {
    type: OPEN_NEW_CARD_MODAL
  }
}

export function closeNewCardModal() {
  return {
    type: CLOSE_NEW_CARD_MODAL
  }
}

export function updateNewCardSide1(markdown) {
  return {
    type: UPDATE_NEW_CARD_SIDE1,
    markdown
  }
}

export function updateNewCardSide2(markdown) {
  return {
    type: UPDATE_NEW_CARD_SIDE2,
    markdown
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

const initialState = Map({
  isOpen: false,
  isSaving: false,
  error: '',
  side1: '',
  side2: ''
})

export default function newCardModal(state = initialState, action) {
  switch (action.type) {
    case OPEN_NEW_CARD_MODAL:
      return state.set('isOpen', true)
    case CLOSE_NEW_CARD_MODAL:
      return state.set('isOpen', false)
    case UPDATE_NEW_CARD_SIDE1:
      return state.set('side1', action.markdown)
    case UPDATE_NEW_CARD_SIDE2:
      return state.set('side2', action.markdown)
    case SAVING_NEW_CARD:
      return state
        .set('isSaving', true)
        .set('error', '')
    case SAVING_NEW_CARD_SUCCESS:
      return state
        .set('isOpen', false)
        .set('isSaving', false)
        .set('error', '')
        .set('side1', '')
        .set('side2', '')
    case SAVING_NEW_CARD_FAILURE:
      return state
        .set('isSaving', false)
        .set('error', action.error)
    default:
      return state
  }
}