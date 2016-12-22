import { Map } from 'immutable'
import { saveNewDeck } from 'helpers/firebase'

const OPEN_NEW_DECK_MODAL = 'OPEN_NEW_DECK_MODAL'
const CLOSE_NEW_DECK_MODAL = 'CLOSE_NEW_DECK_MODAL'
const UPDATE_NEW_DECK_NAME = 'UPDATE_NEW_DECK_NAME'
const SAVING_NEW_DECK = 'SAVING_NEW_DECK'
const SAVING_NEW_DECK_SUCCESS = 'SAVING_NEW_DECK_SUCCESS'
const SAVING_NEW_DECK_FAILURE = 'SAVING_NEW_DECK_FAILURE'

export function saveAndHandleNewDeck() {
  return async (dispatch, getState) => {
    dispatch(savingNewDeck())

    try {
      const { newDeckModal } = getState()
      await saveNewDeck({
        name: newDeckModal.get('name')
      })
      dispatch(savingNewDeckSuccess())
    }
    catch (error) {
      dispatch(savingNewDeckFailure(error.message))
    }
  }
}

export function openNewDeckModal() {
  return {
    type: OPEN_NEW_DECK_MODAL
  }
}

export function closeNewDeckModal() {
  return {
    type: CLOSE_NEW_DECK_MODAL
  }
}

export function updateNewDeckName(name) {
  return {
    type: UPDATE_NEW_DECK_NAME,
    name,
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
    error,
  }
}

const newDeckModalInitialState = Map({
  isSaving: false,
  isOpen: false,
  name: '',
  error: '',
})

export default function newDeckModal(state = newDeckModalInitialState, action) {
  switch(action.type) {
    case OPEN_NEW_DECK_MODAL:
      return state.set('isOpen', true)
    case CLOSE_NEW_DECK_MODAL:
      return state.set('isOpen', false)
    case UPDATE_NEW_DECK_NAME:
      return state.set('name', action.name)
    case SAVING_NEW_DECK:
      return state.set('isSaving', true)
    case SAVING_NEW_DECK_SUCCESS:
      return state
        .set('isSaving', false)
        .set('isOpen', false)
        .set('name', '')
        .set('error', '')
    case SAVING_NEW_DECK_FAILURE:
      return state
        .set('isSaving', false)
        .set('error', action.error)
    default:
      return state
  }
}
