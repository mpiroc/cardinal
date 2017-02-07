import { Map } from 'immutable'
import {
  deleteCard as fbDeleteCard,
} from 'helpers/firebase'

// actions
const SETTING_CARD_VALUE_LISTENER = 'SETTING_CARD_VALUE_LISTENER'
const SETTING_CARD_VALUE_LISTENER_SUCCESS = 'SETTING_CARD_VALUE_LISTENER_SUCCESS'
const SETTING_CARD_VALUE_LISTENER_FAILURE = 'SETTING_CARD_VALUE_LISTENER_FAILURE'
const SETTING_CARD_HISTORY_VALUE_LISTENER = 'SETTING_CARD_HISTORY_VALUE_LISTENER'
const SETTING_CARD_HISTORY_VALUE_LISTENER_SUCCESS = 'SETTING_CARD_HISTORY_VALUE_LISTENER_SUCCESS'
const SETTING_CARD_HISTORY_VALUE_LISTENER_FAILURE = 'SETTING_CARD_HISTORY_VALUE_LISTENER_FAILURE'
const SETTING_CARD_CONTENT_VALUE_LISTENER = 'SETTING_CARD_CONTENT_VALUE_LISTENER'
const SETTING_CARD_CONTENT_VALUE_LISTENER_SUCCESS = 'SETTING_CARD_CONTENT_VALUE_LISTENER_SUCCESS'
const SETTING_CARD_CONTENT_VALUE_LISTENER_FAILURE = 'SETTING_CARD_CONTENT_VALUE_LISTENER_FAILURE'
const DELETING_CARD = 'DELETING_CARD'
const DELETING_CARD_SUCCESS = 'DELETING_CARD_SUCCESS'
const DELETING_CARD_FAILURE = 'DELETING_CARD_FAILURE'
const DISMISS_CARDS_SNACKBAR = 'DISMISS_CARDS_SNACKBAR'
const UPDATE_CARD = 'UPDATE_CARD'
const REMOVE_CARD = 'REMOVE_CARD'
const UPDATE_CARD_HISTORY = 'UPDATE_CARD_HISTORY'
const UPDATE_CARD_CONTENT = 'UPDATE_CARD_CONTENT'
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

export function settingCardContentValueListener(cardId) {
  return {
    type: SETTING_CARD_CONTENT_VALUE_LISTENER,
    cardId,
  }
}

export function settingCardContentValueListenerSuccess(cardId, content) {
  return {
    type: SETTING_CARD_CONTENT_VALUE_LISTENER_SUCCESS,
    cardId,
    content,
  }
}

export function settingCardContentValueListenerFailure(cardId, error) {
  return {
    type: SETTING_CARD_CONTENT_VALUE_LISTENER_FAILURE,
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

export function updateCardContent(cardId, content) {
  return {
    type: UPDATE_CARD_CONTENT,
    cardId,
    content,
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

const initialContentState = Map({
  loadingError: '',

  side1: '',
  side2: '',
})

function content(state = initialContentState, action) {
  switch(action.type) {
    case SETTING_CARD_CONTENT_VALUE_LISTENER_SUCCESS:
      return state
        .set('loadingError', '')
        .merge(action.content)
    case SETTING_CARD_CONTENT_VALUE_LISTENER_FAILURE:
      return state.set('loadingError', action.error)
    case UPDATE_CARD_CONTENT:
      return state.merge(action.content)
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
    case SETTING_CARD_CONTENT_VALUE_LISTENER:
    case SETTING_CARD_CONTENT_VALUE_LISTENER_SUCCESS:
    case SETTING_CARD_CONTENT_VALUE_LISTENER_FAILURE:
    case UPDATE_CARD_CONTENT:
      return state.set('content', content(state.get('content'), action))
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
    case SETTING_CARD_CONTENT_VALUE_LISTENER:
    case SETTING_CARD_CONTENT_VALUE_LISTENER_SUCCESS:
    case SETTING_CARD_CONTENT_VALUE_LISTENER_FAILURE:
    case UPDATE_CARD_CONTENT:
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