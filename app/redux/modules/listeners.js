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
const ADD_CARD_HISTORY_ADDED_LISTENER = 'ADD_CARD_HISTORY_ADDED_LISTENER'
const ADD_CARD_HISTORY_REMOVED_LISTENER = 'ADD_CARD_HISTORY_REMOVED_LISTENER'
const ADD_CARD_HISTORY_VALUE_LISTENER = 'ADD_CARD_HISTORY_VALUE_LISTENER'
const ADD_AUTH_STATE_CHANGED_LISTENER = 'ADD_AUTH_STATE_CHANGED_LISTENER'
const REMOVE_USER_VALUE_LISTENER = 'REMOVE_USER_LISTENER'
const REMOVE_USER_DECK_ADDED_LISTENER = 'REMOVE_USER_DECK_ADDED_LISTENER'
const REMOVE_USER_DECK_REMOVED_LISTENER = 'REMOVE_USER_DECK_REMOVED_LISTENER'
const REMOVE_USER_DECK_VALUE_LISTENER = 'REMOVE_USER_DECK_VALUE_LISTENER'
const REMOVE_DECK_CARD_ADDED_LISTENER = 'REMOVE_DECK_CARD_ADDED_LISTENER'
const REMOVE_DECK_CARD_REMOVED_LISTENER = 'REMOVE_DECK_CARD_REMOVED_LISTENER'
const REMOVE_DECK_CARD_VALUE_LISTENER = 'REMOVE_DECK_CARD_VALUE_LISTENER'
const REMOVE_CARD_HISTORY_ADDED_LISTENER = 'REMOVE_CARD_HISTORY_ADDED_LISTENER'
const REMOVE_CARD_HISTORY_REMOVED_LISTENER = 'REMOVE_CARD_HISTORY_REMOVED_LISTENER'
const REMOVE_CARD_HISTORY_VALUE_LISTENER = 'REMOVE_CARD_HISTORY_VALUE_LISTENER'

// thunks
// Note: Should not disable auth state changed listener
export function disableAndRemoveAllListeners() {
  return (dispatch, getState, firebaseContext) => {
    const { users, decks, cards } = getState()

    users.get('users').forEach((user, uid) => {
      dispatch(removeUserValueListener(uid))
      fbHelpers.removeUserValueListener(firebaseContext, uid)

      dispatch(removeUserDeckAddedListener(uid))
      fbHelpers.removeUserDeckAddedListener(firebaseContext, uid)

      dispatch(removeUserDeckRemovedListener(uid))
      fbHelpers.removeUserDeckRemovedListener(firebaseContext, uid)

      user.get('decks').forEach((deck, deckId) => {
        dispatch(removeUserDeckValueListener(uid, deckId))
        fbHelpers.removeUserDeckValueListener(firebaseContext, uid, deckId)

        dispatch(removeDeckCardAddedListener(deckId))
        fbHelpers.removeDeckCardAddedListener(firebaseContext, uid, deckId)

        dispatch(removeDeckCardRemovedListener(deckId))
        fbHelpers.removeDeckCardRemovedListener(firebaseContext, uid, deckId)

        decks.getIn(['decks', deckId, 'cards']).forEach((card, cardId) => {
          dispatch(removeDeckCardValueListener(deckId, cardId))
          fbHelpers.removeDeckCardValueListener(firebaseContext, uid, deckId, cardId)
        })
      })
    })
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

export function addCardHistoryAddedListener(deckId) {
  return {
    type: ADD_CARD_HISTORY_ADDED_LISTENER,
    deckId,
  }
}

export function addCardHistoryRemovedListener(deckId) {
  return {
    type: ADD_CARD_HISTORY_REMOVED_LISTENER,
    deckId,
  }
}

export function addCardHistoryValueListener(deckId, cardId) {
  return {
    type: ADD_CARD_HISTORY_VALUE_LISTENER,
    deckId,
    cardId,
  }
}

export function addAuthStateChangedListener() {
  return {
    type: ADD_AUTH_STATE_CHANGED_LISTENER
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

export function removeCardHistoryAddedListener(deckId) {
  return {
    type: REMOVE_CARD_HISTORY_ADDED_LISTENER,
    deckId,
  }
}

export function removeCardHistoryRemovedListener(deckId) {
  return {
    type: REMOVE_CARD_HISTORY_REMOVED_LISTENER,
    deckId,
  }
}

export function removeCardHistoryValueListener(deckId, cardId) {
  return {
    type: REMOVE_CARD_HISTORY_VALUE_LISTENER,
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
      return state.set('added', false)
    case REMOVE_USER_DECK_REMOVED_LISTENER:
      return state.set('removed', false)
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
      return state.set('added', false)
    case REMOVE_DECK_CARD_REMOVED_LISTENER:
      return state.set('removed', false)
    case REMOVE_DECK_CARD_VALUE_LISTENER:
      return state.deleteIn(['cards', action.cardId])
    default:
      return state
  }
}

// cardHistories reducer
const initialCardHistoriesState = Map({
  added: false,
  removed: false,
  histories: Map(),
})

function cardHistories(state = initialCardHistoriesState, action) {
  switch(action.type) {
    default:
      return state
  }
}

// listeners reducer
const initialState = Map({
  users: Map(),
  userDecks: Map(),
  deckCards: Map(),
  cardHistories: Map(),
  authStateChanged: false,
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
    case ADD_AUTH_STATE_CHANGED_LISTENER:
      return state.set('authStateChanged', true)
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