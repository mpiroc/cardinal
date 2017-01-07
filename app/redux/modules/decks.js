import { Map } from 'immutable'
import {
  addUserDeckValueListener,
  addDeckCardAddedListener,
  addDeckCardRemovedListener,
} from './listeners'
import {
  setUserDeckValueListener,
  setDeckCardAddedListener,
  setDeckCardRemovedListener,
  deleteDeck,
} from 'helpers/firebase'
import {
  setCardValueListener,
  updateCard,
  removeCard,
} from './cards'

// actions
const DECK_CARD_ADDED_RECEIVED = 'DECK_CARD_ADDED_RECEIVED'
const DECK_CARD_REMOVED_RECEIVED = 'DECK_CARD_REMOVED_RECEIVED'
const SETTING_ADD_OR_REMOVE_DECK_CARD_LISTENER_FAILURE = 'SETTING_ADD_OR_REMOVE_DECK_CARD_LISTENER_FAILURE'
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

// thunks
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
        error => dispatch(settingDeckValueListenerFailure(deckId, error)),
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
        error => dispatch(settingAddOrRemoveDeckCardListenerFailure(deckId, error)),
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
        error => dispatch(settingAddOrRemoveDeckCardListenerFailure(deckId, error)))
    }
  }
}

// action creators
function deckCardAddedReceived(deckId, cardId) {
  return {
    type: DECK_CARD_ADDED_RECEIVED,
    deckId,
    cardId,
  }
}

function deckCardRemovedReceived(deckId, cardId) {
  return {
    type: DECK_CARD_REMOVED_RECEIVED,
    deckId,
    cardId,
  }
}

function settingAddOrRemoveDeckCardListenerFailure(deckId, error) {
  return {
    type: SETTING_ADD_OR_REMOVE_DECK_CARD_LISTENER_FAILURE,
    deckId,
    error,
  }
}

function settingDeckValueListener(deckId) {
  return {
    type: SETTING_DECK_VALUE_LISTENER,
    deckId,
  }
}

function settingDeckValueListenerSuccess(deckId, deck) {
  return {
    type: SETTING_DECK_VALUE_LISTENER_SUCCESS,
    deckId,
    deck,
  }
}

function settingDeckValueListenerFailure(deckId, error) {
  return {
    type: SETTING_DECK_VALUE_LISTENER_FAILURE,
    deckId,
    error,
  }
}

function deletingDeck(deckId) {
  return {
    type: DELETING_DECK,
    deckId,
  }
}

function deletingDeckSuccess(deckId) {
  return { 
    type: DELETING_DECK_SUCCESS,
    deckId,
  }
}

function deletingDeckFailure(deckId, error) {
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

// deck reducer
const initialDeckState = Map({
  isDeleting: false,
  loadingError: '',
  addOrRemoveError: '',

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
      return state.set('isDeleting', false)
    case UPDATE_DECK:
      return state.merge(action.deck)
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
    case DELETING_DECK:
      return state
        .set('isActive', false)
        .set('error', '')
    case DELETING_DECK_SUCCESS:
      return state
        .set('isActive', false)
        .set('error', '')
    case DELETING_DECK_FAILURE:
      return state
        .set('isActive', true)
        .set('error', action.error)
    case DISMISS_DECKS_SNACKBAR:
      // Don't reset 'error', so devs can still view it in the redux store.
      return state.set('isActive', false)
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
      path = ['decks', action.deckId]
      return state.setIn(path, deck(state.getIn(path), action))
    case DELETING_DECK:
    case DELETING_DECK_FAILURE:
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
      return state.set('decks', Map())
    default:
      return state
  }
}