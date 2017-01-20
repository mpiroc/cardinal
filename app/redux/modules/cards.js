import { Map } from 'immutable'
import {
  addDeckCardValueListenerFlag,
  addCardHistoryValueListenerFlag,
} from './listeners'
import {
  setDeckCardValueListener as fbSetDeckCardValueListener,
  setCardHistoryValueListener as fbSetCardHistoryValueListener,
  deleteCard as fbDeleteCard,
} from 'helpers/firebase'

// actions
const SETTING_CARD_VALUE_LISTENER = 'SETTING_CARD_VALUE_LISTENER'
const SETTING_CARD_VALUE_LISTENER_SUCCESS = 'SETTING_CARD_VALUE_LISTENER_SUCCESS'
const SETTING_CARD_VALUE_LISTENER_FAILURE = 'SETTING_CARD_VALUE_LISTENER_FAILURE'
const SETTING_CARD_HISTORY_VALUE_LISTENER = 'SETTING_CARD_HISTORY_VALUE_LISTENER'
const SETTING_CARD_HISTORY_VALUE_LISTENER_SUCCESS = 'SETTING_CARD_HISTORY_VALUE_LISTENER_SUCCESS'
const SETTING_CARD_HISTORY_VALUE_LISTENER_FAILURE = 'SETTING_CARD_HISTORY_VALUE_LISTENER_FAILURE'
const DELETING_CARD = 'DELETING_CARD'
const DELETING_CARD_SUCCESS = 'DELETING_CARD_SUCCESS'
const DELETING_CARD_FAILURE = 'DELETING_CARD_FAILURE'
const DISMISS_CARDS_SNACKBAR = 'DISMISS_CARDS_SNACKBAR'
const UPDATE_CARD = 'UPDATE_CARD'
const REMOVE_CARD = 'REMOVE_CARD'
const UPDATE_CARD_HISTORY = 'UPDATE_CARD_HISTORY'
const CARDS_LOGOUT = 'CARDS_LOGOUT'

// thunks
export function deleteAndHandleCard(deckId, cardId) {
  return async (dispatch, getState, firebaseContext) => {
    const uid = getState().auth.get('authedUid')

    dispatch(deletingCard(cardId))

    try {
      await fbDeleteCard(firebaseContext, uid, deckId, cardId)
      dispatch(deletingCardSuccess(cardId))
    }
    catch (error) {
      dispatch(deletingCardFailure(cardId, `Error deleting card: ${error.message}`))
    }
  }
}

export function setCardValueListener(deckId, cardId) {
  return (dispatch, getState, firebaseContext) => {
    const { auth, listeners } = getState()
    const uid = auth.get('authedUid')

    if (listeners.getIn(['deckCards', deckId, 'cards', cardId]) !== true) {
      dispatch(addDeckCardValueListenerFlag(deckId, cardId))
      dispatch(settingCardValueListener(cardId))
      fbSetDeckCardValueListener(
        firebaseContext,
        uid, deckId, cardId,
        card => dispatch(settingCardValueListenerSuccess(cardId, card)),
        error => dispatch(settingCardValueListenerFailure(cardId, error)),
      )
    }
  }
}

export function setCardHistoryValueListener(deckId, cardId) {
  return (dispatch, getState, firebaseContext) => {
    const { auth, listeners } = getState()
    const uid = auth.get('authedUid')

    if (listeners.getIn(['cardHistories', deckId, 'histories', cardId]) !== true) {
      dispatch(addCardHistoryValueListenerFlag(deckId, cardId))
      dispatch(settingCardHistoryValueListener(cardId))
      fbSetCardHistoryValueListener(
        firebaseContext,
        uid, deckId, cardId,
        card => dispatch(settingCardHistoryValueListenerSuccess(cardId, card)),
        error => dispatch(settingCardHistoryValueListenerFailure(cardId, error)),
      )
    }
  }
}

// action creators
export function settingCardValueListener(cardId) {
  return {
    type: SETTING_CARD_VALUE_LISTENER,
    cardId,
  }
}

export function settingCardValueListenerSuccess(cardId, card) {
  return {
    type: SETTING_CARD_VALUE_LISTENER_SUCCESS,
    cardId,
    card,
  }
}

export function settingCardValueListenerFailure(cardId, error) {
  return {
    type: SETTING_CARD_VALUE_LISTENER_FAILURE,
    cardId,
    error,
  }
}

export function settingCardHistoryValueListener(cardId) {
  return {
    type: SETTING_CARD_HISTORY_VALUE_LISTENER,
    cardId,
  }
}

export function settingCardHistoryValueListenerSuccess(cardId, history) {
  return {
    type: SETTING_CARD_HISTORY_VALUE_LISTENER_SUCCESS,
    cardId,
    history,
  }
}

export function settingCardHistoryValueListenerFailure(cardId, error) {
  return {
    type: SETTING_CARD_HISTORY_VALUE_LISTENER_FAILURE,
    cardId,
    error,
  }
}

export function deletingCard(cardId) {
  return {
    type: DELETING_CARD,
    cardId,
  }
}

export function deletingCardSuccess(cardId) {
  return { 
    type: DELETING_CARD_SUCCESS,
    cardId,
  }
}

export function deletingCardFailure(cardId, error) {
  return {
    type: DELETING_CARD_FAILURE,
    cardId,
    error,
  }
}

export function dismissCardsSnackbar() {
  return {
    type: DISMISS_CARDS_SNACKBAR,
  }
}

export function updateCard(cardId, card) {
  return {
    type: UPDATE_CARD,
    cardId,
    card
  }
}

export function updateCardHistory(cardId, history) {
  return {
    type: UPDATE_CARD_HISTORY,
    cardId,
    history,
  }
}

export function removeCard(cardId) {
  return {
    type: REMOVE_CARD,
    cardId
  }
}

export function cardsLogout() {
  return {
    type: CARDS_LOGOUT
  }
}

const initialHistoryState = Map({
  loadingError: '',

  grade: 0,
  difficulty: 2.5,
  repetitionCount : 0,
  previousReviewMs: undefined,
  nextReviewMs: undefined,
})

function history(state = initialHistoryState, action) {
  switch(action.type) {
    case SETTING_CARD_HISTORY_VALUE_LISTENER_SUCCESS:
      return state
        .set('loadingError', '')
        .merge(action.history)
    case SETTING_CARD_HISTORY_VALUE_LISTENER_FAILURE:
      return state.set('loadingError', action.error)
    case UPDATE_CARD_HISTORY:
      return state.merge(action.history)
    default:
      return state
  }
}

// card reducer
const initialCardState = Map({
  history: history(undefined, { type: undefined }),
  isDeleting: false,
  loadingError: '',
  deletingError: '',

  cardId: '',
  side1: '',
  side2: '',
})

function card(state = initialCardState, action) {
  switch(action.type) {
    case SETTING_CARD_VALUE_LISTENER:
      return state.set('cardId', action.cardId)
    case SETTING_CARD_VALUE_LISTENER_SUCCESS:
      // TODO: Can action.card be null?
      return state
        .set('loadingError', '')
        .merge(action.card)
    case SETTING_CARD_VALUE_LISTENER_FAILURE:
      return state.set('loadingError', action.error)
    case DELETING_CARD:
      return state.set('isDeleting', true)
    case DELETING_CARD_FAILURE:
      return state
        .set('isDeleting', false)
        .set('deletingError', action.error)
    case UPDATE_CARD:
      return state.merge(action.card)
    case SETTING_CARD_HISTORY_VALUE_LISTENER:
    case SETTING_CARD_HISTORY_VALUE_LISTENER_SUCCESS:
    case SETTING_CARD_HISTORY_VALUE_LISTENER_FAILURE:
    case UPDATE_CARD_HISTORY:
      return state.set('history', history(state.get('history'), action))
    default:
      return state
  }
}

const initialSnackbarState = Map({
  isActive: false,
  error: '',
})

function snackbar(state = initialSnackbarState, action) {
  switch(action.type) {
    case DELETING_CARD:
      return state
        .set('isActive', false)
        .set('error', '')
    case DELETING_CARD_SUCCESS:
      return state
        .set('isActive', false)
        .set('error', '')
    case DELETING_CARD_FAILURE:
      return state
        .set('isActive', true)
        .set('error', action.error)
    case DISMISS_CARDS_SNACKBAR:
      return state
        .set('isActive', false)
        .set('error', '')
    default:
      return state
  }
}

// cards reducer
const initialState = Map({
  cards: Map(),
  snackbar: snackbar(undefined, { type: undefined }),
})

export default function cards(state = initialState, action) {
  let path = []
  switch(action.type) {
    case SETTING_CARD_VALUE_LISTENER:
    case SETTING_CARD_VALUE_LISTENER_SUCCESS:
    case SETTING_CARD_VALUE_LISTENER_FAILURE:
    case UPDATE_CARD:
    case SETTING_CARD_HISTORY_VALUE_LISTENER:
    case SETTING_CARD_HISTORY_VALUE_LISTENER_SUCCESS:
    case SETTING_CARD_HISTORY_VALUE_LISTENER_FAILURE:
    case UPDATE_CARD_HISTORY:
      path = ['cards', action.cardId]
      return state.setIn(path, card(state.getIn(path), action))
    case DELETING_CARD:
    case DELETING_CARD_FAILURE:
      path = ['cards', action.cardId]
      return state
        .setIn(path, card(state.getIn(path), action))
        .set('snackbar', snackbar(state.get('snackbar'), action))
    case DELETING_CARD_SUCCESS:
    case DISMISS_CARDS_SNACKBAR:
      return state
        .set('snackbar', snackbar(state.get('snackbar'), action))
    case REMOVE_CARD:
      return state.deleteIn(['cards', action.cardId])
    case CARDS_LOGOUT:
      return cards(undefined, { type: undefined })
    default:
      return state
  }
}