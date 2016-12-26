import { Map } from 'immutable'
import * as fbHelpers from 'helpers/firebase'

// actions
const ADD_USER_VALUE_LISTENER = 'ADD_USER_LISTENER'
const ADD_USER_DECK_ADDED_LISTENER = 'ADD_USER_DECK_ADDED_LISTENER'
const ADD_USER_DECK_REMOVED_LISTENER = 'ADD_USER_DECK_REMOVED_LISTENER'
const ADD_USER_DECK_VALUE_LISTENER = 'ADD_USER_DECK_VALUE_LISTENER'
const ADD_DECK_CARD_ADDED_LISTENER = 'ADD_DECK_CARD_ADDED_LISTENER'
const ADD_DECK_CARD_REMOVED_LISTENER = 'ADD_DECK_CARD_REMOVED_LISTENER'
const ADD_DECK_CARD_VALUE_LISTENER = 'ADD_DECK_CARD_VALUE_LISTENER'
const REMOVE_USER_VALUE_LISTENER = 'REMOVE_USER_LISTENER'
const REMOVE_USER_DECK_ADDED_LISTENER = 'REMOVE_USER_DECK_ADDED_LISTENER'
const REMOVE_USER_DECK_REMOVED_LISTENER = 'REMOVE_USER_DECK_REMOVED_LISTENER'
const REMOVE_USER_DECK_VALUE_LISTENER = 'REMOVE_USER_DECK_VALUE_LISTENER'
const REMOVE_DECK_CARD_ADDED_LISTENER = 'REMOVE_DECK_CARD_ADDED_LISTENER'
const REMOVE_DECK_CARD_REMOVED_LISTENER = 'REMOVE_DECK_CARD_REMOVED_LISTENER'
const REMOVE_DECK_CARD_VALUE_LISTENER = 'REMOVE_DECK_CARD_VALUE_LISTENER'

// thunks
export function disableAndRemoveAllListeners() {
  return (dispatch, getState) => {
    const { listeners } = getState()

    for (uid in listeners.get('users').keySeq()) {
      removeUserValueListener(uid)
      fbHelpers.removeUserValueListener(uid)
    }

    const userDecks = listeners.get('userDecks')
    for (uid in userDecks.keySeq()) {
      const userDeck = userDecks.get(uid)
      if (userDeck.get('added') === true) {
        removeUserDeckAddedListener(uid)
        fbHelpers.removeUserDeckAddedListener(uid)
      }
      if (userDeck.get('removed') === true) {
        removeUserDeckRemovedListener(uid)
        fbHelpers.removeUserDeckRemovedListener(uid)
      }
      for (deckId in userDeck.get('decks').keySeq()) {
        removeUserDeckValueListener(uid, deckId)
        fbHelpers.removeUserDeckValueListener(uid, deckId)
      }
    }

    const deckCards = listeners.get('deckCards')
    for (deckId in deckCards.keySeq()) {
      const deckCard = deckCards.get('deckId')
      if (deckCard.get('added') === true) {
        removeDeckCardAddedListener(deckId)
        fbHelpers.removeDeckCardAddedListener(deckId)
      }
      if (deckCard.get('removed') === true) {
        removeDeckCardRemovedListener(deckId)
        fbHelpers.removeDeckCardRemovedListener(deckId)
      }
      for (cardId in deckCard.get('cards').keySeq()) {
        removeDeckCardValueListener(deckId, cardId)
        fbHelpers.removeDeckCardValueListener(deckId, cardId)
      }
    }
  }
}

// action creators
export function addUserValueListener(uid) {
  return {
    type: ADD_USER_VALUE_LISTENER,
    uid,
  }
}

export function addUserDeckAddedListener(uid) {
  return {
    type: ADD_USER_DECK_ADDED_LISTENER,
    uid,
  }
}

export function addUserDeckRemovedListener(uid) {
  return {
    type: ADD_USER_DECK_REMOVED_LISTENER,
    uid,
  }
}

export function addUserDeckValueListener(uid, deckId) {
  return {
    type: ADD_USER_DECK_VALUE_LISTENER,
    uid,
    deckId,
  }
}

export function addDeckCardAddedListener(deckId) {
  return {
    type: ADD_DECK_CARD_ADDED_LISTENER,
    deckId,
  }
}

export function addDeckCardRemovedListener(deckId) {
  return {
    type: ADD_DECK_CARD_REMOVED_LISTENER,
    deckId,
  }
}

export function addDeckCardValueListener(deckId, cardId) {
  return {
    type: ADD_DECK_CARD_VALUE_LISTENER,
    deckId,
    cardId,
  }
}

export function removeUserValueListener(uid) {
  return {
    type: REMOVE_USER_VALUE_LISTENER,
    uid,
  }
}

export function removeUserDeckAddedListener(uid) {
  return {
    type: REMOVE_USER_DECK_ADDED_LISTENER,
    uid,
  }
}

export function removeUserDeckRemovedListener(uid) {
  return {
    type: REMOVE_USER_DECK_REMOVED_LISTENER,
    uid,
  }
}

export function removeUserDeckValueListener(uid, deckId) {
  return {
    type: REMOVE_USER_DECK_VALUE_LISTENER,
    uid,
    deckId,
  }
}

export function removeDeckCardAddedListener(deckId) {
  return {
    type: REMOVE_DECK_CARD_ADDED_LISTENER,
    deckId,
  }
}

export function removeDeckCardRemovedListener(deckId) {
  return {
    type: REMOVE_DECK_CARD_REMOVED_LISTENER,
    deckId,
  }
}

export function removeDeckCardValueListener(deckId, cardId) {
  return {
    type: REMOVE_DECK_CARD_VALUE_LISTENER,
    deckId,
    cardId,
  }
}

// userDecks reducer
const initialUserDecksState = Map({
  added: false,
  removed: false,
  decks: Map(),
})

function userDecks(state = initialUserDecksState, action) {
  switch(action.type) {
    case ADD_USER_DECK_ADDED_LISTENER:
      return state.set('added', true)
    case ADD_USER_DECK_REMOVED_LISTENER:
      return state.set('removed', true)
    case ADD_USER_DECK_VALUE_LISTENER:
      return state.setIn(['decks', action.deckId], true)
    case REMOVE_USER_DECK_ADDED_LISTENER:
      return state.delete('added')
    case REMOVE_USER_DECK_REMOVED_LISTENER:
      return state.delete('removed')
    case REMOVE_USER_DECK_VALUE_LISTENER:
      return state.deleteIn(['decks', action.deckId])
    default:
      return state
  }
}

// deckCards reducer
const initialDeckCardsState = Map({
  added: false,
  removed: false,
  cards: Map(),
})

function deckCards(state = initialDeckCardsState, action) {
  switch(action.type) {
    case ADD_DECK_CARD_ADDED_LISTENER:
      return state.set('added', true)
    case ADD_DECK_CARD_REMOVED_LISTENER:
      return state.set('removed', true)
    case ADD_DECK_CARD_VALUE_LISTENER:
      return state.setIn(['cards', action.cardId], true)
    case REMOVE_DECK_CARD_ADDED_LISTENER:
      return state.delete('added')
    case REMOVE_DECK_CARD_REMOVED_LISTENER:
      return state.delete('removed')
    case REMOVE_DECK_CARD_VALUE_LISTENER:
      return state.deleteIn(['cards', action.cardId])
    default:
      return state
  }
}

// listeners reducer
const initialState = Map({
  users: Map(),
  userDecks: Map(),
  deckCards: Map(),
})

export default function listeners (state = initialState, action) {
  let path = []
  switch(action.type) {
    case ADD_USER_VALUE_LISTENER:
      return state.setIn(['users', action.uid], true)
    case ADD_USER_DECK_ADDED_LISTENER:
    case ADD_USER_DECK_REMOVED_LISTENER:
    case ADD_USER_DECK_VALUE_LISTENER:
      path = ['userDecks', action.uid]
      return state.setIn(path, userDecks(state.getIn(path), action))
    case ADD_DECK_CARD_ADDED_LISTENER:
    case ADD_DECK_CARD_REMOVED_LISTENER:
    case ADD_DECK_CARD_VALUE_LISTENER:
      path = ['deckCards', action.deckId]
      return state.setIn(path, deckCards(state.getIn(path), action))
    case REMOVE_USER_VALUE_LISTENER:
      return state.deleteIn(['users', action.uid], true)
    case REMOVE_USER_DECK_ADDED_LISTENER:
    case REMOVE_USER_DECK_REMOVED_LISTENER:
    case REMOVE_USER_DECK_VALUE_LISTENER:
      path = ['userDecks', action.uid]
      return state.setIn(path, userDecks(state.getIn(path), action))
    case REMOVE_DECK_CARD_ADDED_LISTENER:
    case REMOVE_DECK_CARD_REMOVED_LISTENER:
    case REMOVE_DECK_CARD_VALUE_LISTENER:
      path = ['deckCards', action.deckId]
      return state.setIn(path, deckCards(state.getIn(path), action))
    default:
      return state
  }
}