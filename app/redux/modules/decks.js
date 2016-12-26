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
} from 'helpers/firebase'
import {
  updateCard,
  removeCard,
} from './decks'

// actions
const DECK_CARD_ADDED_RECEIVED = 'DECK_CARD_ADDED_RECEIVED'
const DECK_CARD_REMOVED_RECEIVED = 'DECK_CARD_REMOVED_RECEIVED'
const SETTING_ADD_OR_REMOVE_DECK_CARD_LISTENER_FAILURE = 'SETTING_ADD_OR_REMOVE_DECK_CARD_LISTENER_FAILURE'
const SETTING_DECK_VALUE_LISTENER = 'SETTING_DECK_VALUE_LISTENER'
const SETTING_DECK_VALUE_LISTENER_SUCCESS = 'SETTING_DECK_VALUE_LISTENER_SUCCESS'
const SETTING_DECK_VALUE_LISTENER_FAILURE = 'SETTING_DECK_VALUE_LISTENER_FAILURE'
const UPDATE_DECK = 'UPDATE_DECK'
const REMOVE_DECK = 'REMOVE_DECK'

// thunks
export function setDeckValueListener(uid, deckId) {
  return (dispatch, getState) => {
    const state = getState().listeners

    if (state.getIn(['userDecks', uid, 'decks', deckId]) !== true) {
      dispatch(addUserDeckValueListener(uid, deckId))
      dispatch(settingDeckValueListener(deckId))
      setUserDeckValueListener(
        uid, deckId,
        deck => dispatch(settingDeckValueListenerSuccess(deckId, deck)),
        error => dispatch(settingDeckValueListenerFailure(deckId, error)),
      )
    }
  }
}

export function setDeckCardCollectionListeners(deckId) {
  return (dispatch, getState) => {
    const state = getState().listeners

    if (state.getIn(['deckCards', deckId, 'added']) !== true) {
      dispatch(addDeckCardAddedListener(deckId))
      setDeckCardAddedListener(
        deckId,
        card => {
          dispatch(deckCardAddedReceived(deckId, card))
          dispatch(updateCard(card.cardId, card))
        },
        error => dispatch(settingAddOrRemoveDeckCardListenerFailure(deckId, error)),
      )
    }

    if (state.getIn(['deckCards', deckId, 'removed']) !== true) {
      dispatch(addDeckCardRemovedListener(deckId))
      setDeckCardRemovedListener(
        deckId,
        card => {
          dispatch(deckCardRemovedReceived(deckId, card))
          dispatch(removeCard(card.cardId))
        },
        error => dispatch(settingAddOrRemoveDeckCardListenerFailure(deckId, error)))
    }
  }
}

// action creators
function deckCardAddedReceived(deckId, card) {
  return {
    type: DECK_CARD_ADDED_RECEIVED,
    deck,
    cardId,
  }
}

function deckCardRemovedReceived(deckId, card) {
  return {
    type: DECK_CARD_REMOVED_RECEIVED,
    deck,
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

// deck reducer
const initialDeckState = Map({
  isLoading: true,
  loadingError: '',
  addOrRemoveError: '',

  deckId: '',
  name: '',
  cards: Map(),
})

function deck(state = initialDeckState, action) {
  switch (action.type) {
    case DECK_CARD_ADDED_RECEIVED:
      return state.setIn(['cards', action.card.cardId], true)
    case DECK_CARD_REMOVED_RECEIVED:
      return state.deleteIn(['cards', action.card.cardId])
    case SETTING_ADD_OR_REMOVE_DECK_CARD_LISTENER_FAILURE:
      return state.set('addOrRemoveError', action.error)
    case SETTING_DECK_VALUE_LISTENER:
      return state
        .set('isLoading', true)
        .set('loadingError', '')
    case SETTING_DECK_VALUE_LISTENER_SUCCESS:
      // TODO: Can action.deck be null?
      return state
        .set('isLoading', false)
        .set('loadingError', '')
        .merge(action.deck)
    case SETTING_DECK_VALUE_LISTENER_FAILURE:
      return state
        .set('isLoading', false)
        .set('loadingError', action.error)
    case UPDATE_DECK:
      return state.merge(action.deck)
    default:
      return state
  }
}

// decks reducer
const initialState = Map({
  decks: Map(),
})

export default function decks(state = initialState, action) {
  switch (action.type) {
    case DECK_CARD_ADDED_RECEIVED:
    case DECK_CARD_REMOVED_RECEIVED:
    case SETTING_ADD_OR_REMOVE_DECK_CARD_LISTENER_FAILURE:
    case SETTING_DECK_VALUE_LISTENER:
    case SETTING_DECK_VALUE_LISTENER_SUCCESS:
    case SETTING_DECK_VALUE_LISTENER_FAILURE:
    case UPDATE_DECK:
      const path = ['decks', action.deckId]
      return state.setIn(path, deck(state.getIn(path), action))
    case REMOVE_DECK:
      return state.deleteIn(['decks', action.deckId])
    default:
      return state
  }
}