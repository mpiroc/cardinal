import { Map } from 'immutable'
import {
  addUserDeckValueListener,
  addDeckCardAddedListener,
  addDeckCardRemovedListener,
  addCardHistoryAddedListener,
} from './listeners'
import {
  setUserDeckValueListener,
  setDeckCardAddedListener,
  setDeckCardRemovedListener,
  setCardHistoryAddedListener,
  deleteDeck,
  fetchDeckHistory,
} from 'helpers/firebase'
import {
  setCardValueListener,
  setCardHistoryValueListener,
  updateCard,
  removeCard,
  updateCardHistory,
} from './cards'

// actions
const DECK_CARD_ADDED_RECEIVED = 'DECK_CARD_ADDED_RECEIVED'
const DECK_CARD_REMOVED_RECEIVED = 'DECK_CARD_REMOVED_RECEIVED'
const SETTING_ADD_OR_REMOVE_DECK_CARD_LISTENER_FAILURE = 'SETTING_ADD_OR_REMOVE_DECK_CARD_LISTENER_FAILURE'
const SETTING_ADD_CARD_HISTORY_LISTENER_FAILURE = 'SETTING_REMOVE_CARD_HISTORY_LISTENER_FAILURE'
const SETTING_DECK_VALUE_LISTENER = 'SETTING_DECK_VALUE_LISTENER'
const SETTING_DECK_VALUE_LISTENER_SUCCESS = 'SETTING_DECK_VALUE_LISTENER_SUCCESS'
const SETTING_DECK_VALUE_LISTENER_FAILURE = 'SETTING_DECK_VALUE_LISTENER_FAILURE'
const DELETING_DECK = 'DELETING_DECK'
const DELETING_DECK_SUCCESS = 'DELETING_DECK_SUCCESS'
const DELETING_DECK_FAILURE = 'DELETING_DECK_FAILURE'
const DISMISS_DECKS_SNACKBAR = 'DISMISS_DECKS_SNACKBAR'
const UPDATE_DECK = 'UPDATE_DECK'
const REMOVE_DECK = 'REMOVE_DECK'
const DECKS_LOGOUT = 'DECKS_LOGOUT'
const FETCHING_DECK_HISTORY = 'FETCHING_DECK_HISTORY'
const FETCHING_DECK_HISTORY_SUCCESS = 'FETCHING_DECK_HISTORY_SUCCESS'
const FETCHING_DECK_HISTORY_FAILURE = 'FETCHING_DECK_HISTORY_FAILURE'

// thunks
export function fetchAndHandleDeckHistory(uid, deckId) {
  return async (dispatch, getState, firebaseContext) => {
    dispatch(fetchingDeckHistory(deckId))

    try {
      const cardHistories = await fetchDeckHistory(firebaseContext, uid, deckId)
      for (let cardId in cardHistories) {
        dispatch(updateCardHistory(cardId, cardHistories[cardId]))
      }
      dispatch(fetchingDeckHistorySuccess(deckId))
    }
    catch (error) {
      dispatch(fetchingDeckHistoryFailure(deckId, `Error fetching deck history: ${error.message}`))
    }
  }
}

export function deleteAndHandleDeck(uid, deckId) {
  return async (dispatch, getState, firebaseContext) => {
    dispatch(deletingDeck(deckId))

    try {
      await deleteDeck(firebaseContext, uid, deckId)
      dispatch(deletingDeckSuccess(deckId))
    }
    catch (error) {
      dispatch(deletingDeckFailure(deckId, `Error deleting deck: ${error.message}`))
    }
  }
}

export function setDeckValueListener(uid, deckId) {
  return (dispatch, getState, firebaseContext) => {
    const listeners = getState().listeners

    if (listeners.getIn(['userDecks', uid, 'decks', deckId]) !== true) {
      dispatch(addUserDeckValueListener(uid, deckId))
      dispatch(settingDeckValueListener(deckId))
      setUserDeckValueListener(
        firebaseContext,
        uid, deckId,
        deck => dispatch(settingDeckValueListenerSuccess(deckId, deck)),
        error => dispatch(settingDeckValueListenerFailure(deckId, error.message)),
      )
    }
  }
}

export function setDeckCardCollectionListeners(deckId) {
  return (dispatch, getState, firebaseContext) => {
    const { auth, listeners } = getState()
    const uid = auth.get('authedUid')

    if (listeners.getIn(['deckCards', deckId, 'added']) !== true) {
      dispatch(addDeckCardAddedListener(deckId))
      setDeckCardAddedListener(
        firebaseContext,
        uid,
        deckId,
        card => {
          dispatch(deckCardAddedReceived(deckId, card.cardId))
          dispatch(updateCard(card.cardId, card))
          dispatch(setCardValueListener(deckId, card.cardId))
        },
        error => dispatch(settingAddOrRemoveDeckCardListenerFailure(deckId, error.message)),
      )
    }

    if (listeners.getIn(['deckCards', deckId, 'removed']) !== true) {
      dispatch(addDeckCardRemovedListener(deckId))
      setDeckCardRemovedListener(
        firebaseContext,
        uid,
        deckId,
        card => {
          dispatch(deckCardRemovedReceived(deckId, card.cardId))
          dispatch(removeCard(card.cardId))
        },
        error => dispatch(settingAddOrRemoveDeckCardListenerFailure(deckId, error.message)))
    }
  }
}

export function setCardHistoryCollectionListeners(deckId) {
  return (dispatch, getState, firebaseContext) => {
    const { auth, listeners } = getState()
    const uid = auth.get('authedUid')

    if (listeners.getIn(['cardHistories', deckId, 'added']) !== true) {
      dispatch(addCardHistoryAddedListener(deckId))
      setCardHistoryAddedListener(
        firebaseContext,
        uid,
        deckId,
        (cardId, history) => {
          dispatch(updateCardHistory(cardId, history))
          dispatch(setCardHistoryValueListener(deckId, cardId))
        },
        error => dispatch(settingAddCardHistoryListenerFailure(deckId, error.message)),
      )
    }
  }
}

// action creators
export function deckCardAddedReceived(deckId, cardId) {
  return {
    type: DECK_CARD_ADDED_RECEIVED,
    deckId,
    cardId,
  }
}

export function deckCardRemovedReceived(deckId, cardId) {
  return {
    type: DECK_CARD_REMOVED_RECEIVED,
    deckId,
    cardId,
  }
}

export function settingAddOrRemoveDeckCardListenerFailure(deckId, error) {
  return {
    type: SETTING_ADD_OR_REMOVE_DECK_CARD_LISTENER_FAILURE,
    deckId,
    error,
  }
}

export function settingDeckValueListener(deckId) {
  return {
    type: SETTING_DECK_VALUE_LISTENER,
    deckId,
  }
}

export function settingDeckValueListenerSuccess(deckId, deck) {
  return {
    type: SETTING_DECK_VALUE_LISTENER_SUCCESS,
    deckId,
    deck,
  }
}

export function settingDeckValueListenerFailure(deckId, error) {
  return {
    type: SETTING_DECK_VALUE_LISTENER_FAILURE,
    deckId,
    error,
  }
}

export function deletingDeck(deckId) {
  return {
    type: DELETING_DECK,
    deckId,
  }
}

export function deletingDeckSuccess(deckId) {
  return { 
    type: DELETING_DECK_SUCCESS,
    deckId,
  }
}

export function deletingDeckFailure(deckId, error) {
  return {
    type: DELETING_DECK_FAILURE,
    deckId,
    error,
  }
}

export function dismissDecksSnackbar() {
  return {
    type: DISMISS_DECKS_SNACKBAR,
  }
}

export function updateDeck(deckId, deck) {
  return {
    type: UPDATE_DECK,
    deckId,
    deck,
  }
}

export function removeDeck(deckId) {
  return {
    type: REMOVE_DECK,
    deckId,
  }
}

export function decksLogout() {
  return {
    type: DECKS_LOGOUT
  }
}

export function fetchingDeckHistory(deckId) {
  return {
    type: FETCHING_DECK_HISTORY,
    deckId,
  }
}

export function fetchingDeckHistorySuccess(deckId) {
  return {
    type: FETCHING_DECK_HISTORY_SUCCESS,
    deckId,
  }
}

export function fetchingDeckHistoryFailure(deckId, error) {
  return {
    type: FETCHING_DECK_HISTORY_FAILURE,
    deckId,
    error,
  }
}

// deck reducer
const initialDeckState = Map({
  isFetchingHistory: false,
  isDeleting: false,

  loadingError: '',
  addOrRemoveError: '',
  deletingError: '',
  fetchingHistoryError: '',

  deckId: '',
  name: '',

  cards: Map(),
})

function deck(state = initialDeckState, action) {
  switch (action.type) {
    case DECK_CARD_ADDED_RECEIVED:
      return state.setIn(['cards', action.cardId], true)
    case DECK_CARD_REMOVED_RECEIVED:
      return state.deleteIn(['cards', action.cardId])
    case SETTING_ADD_OR_REMOVE_DECK_CARD_LISTENER_FAILURE:
      return state.set('addOrRemoveError', action.error)
    case SETTING_DECK_VALUE_LISTENER:
      return state.set('loadingError', '')
    case SETTING_DECK_VALUE_LISTENER_SUCCESS:
      // TODO: Can action.deck be null?
      return state
        .set('loadingError', '')
        .merge(action.deck)
    case SETTING_DECK_VALUE_LISTENER_FAILURE:
      return state.set('loadingError', action.error)
    case DELETING_DECK:
      return state.set('isDeleting', true)
    case DELETING_DECK_FAILURE:
      return state
        .set('isDeleting', false)
        .set('deletingError', action.error)
    case UPDATE_DECK:
      return state.merge(action.deck)
    case FETCHING_DECK_HISTORY:
      return state.set('isFetchingHistory', true)
    case FETCHING_DECK_HISTORY_SUCCESS:
      return state
        .set('isFetchingHistory', false)
        .set('fetchingHistoryError', '')
    case FETCHING_DECK_HISTORY_FAILURE:
      return state
        .set('isFetchingHistory', false)
        .set('fetchingHistoryError', action.error)
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
    case SETTING_ADD_OR_REMOVE_DECK_CARD_LISTENER_FAILURE:
    case SETTING_DECK_VALUE_LISTENER_FAILURE:
    case DELETING_DECK_FAILURE:
    case FETCHING_DECK_HISTORY_FAILURE:
      return state
        .set('isActive', true)
        .set('error', action.error)
    case DISMISS_DECKS_SNACKBAR:
      return state
        .set('isActive', false)
        .set('error', '')
    default:
      return state
  }
}

// decks reducer
const initialState = Map({
  decks: Map(),
  snackbar: snackbar(undefined, { type: undefined }),
})

export default function decks(state = initialState, action) {
  let path = []
  switch (action.type) {
    case DECK_CARD_ADDED_RECEIVED:
    case DECK_CARD_REMOVED_RECEIVED:
    case SETTING_ADD_OR_REMOVE_DECK_CARD_LISTENER_FAILURE:
    case SETTING_DECK_VALUE_LISTENER:
    case SETTING_DECK_VALUE_LISTENER_SUCCESS:
    case SETTING_DECK_VALUE_LISTENER_FAILURE:
    case UPDATE_DECK:
    case DELETING_DECK:
    case DELETING_DECK_FAILURE:
    case FETCHING_DECK_HISTORY:
    case FETCHING_DECK_HISTORY_SUCCESS:
    case FETCHING_DECK_HISTORY_FAILURE:
      path = ['decks', action.deckId]
      return state
        .setIn(path, deck(state.getIn(path), action))
        .set('snackbar', snackbar(state.get('snackbar'), action))
    case DELETING_DECK_SUCCESS:
    case DISMISS_DECKS_SNACKBAR:
      return state
        .set('snackbar', snackbar(state.get('snackbar'), action))
    case REMOVE_DECK:
      return state.deleteIn(['decks', action.deckId])
    case DECKS_LOGOUT:
      return state
        .set('decks', Map())
        .set('snackbar', snackbar(undefined, { type: undefined }))
    default:
      return state
  }
}