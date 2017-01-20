import { Map } from 'immutable'
import {
  setUserValueListener,
  setUserDeckAddedListener,
  setUserDeckRemovedListener,
  setUserDeckValueListener,
  setDeckCardAddedListener,
  setDeckCardRemovedListener,
  setDeckCardValueListener,
  setCardHistoryAddedListener,
  setCardHistoryValueListener,
  removeUserValueListener,
  removeUserDeckAddedListener,
  removeUserDeckRemovedListener,
  removeUserDeckValueListener,
  removeDeckCardAddedListener,
  removeDeckCardRemovedListener,
  removeDeckCardValueListener,
} from 'helpers/firebase'

// actions
const ADD_USER_VALUE_LISTENER = 'ADD_USER_VALUE_LISTENER'
const ADD_USER_DECK_ADDED_LISTENER = 'ADD_USER_DECK_ADDED_LISTENER'
const ADD_USER_DECK_REMOVED_LISTENER = 'ADD_USER_DECK_REMOVED_LISTENER'
const ADD_USER_DECK_VALUE_LISTENER = 'ADD_USER_DECK_VALUE_LISTENER'
const ADD_DECK_CARD_ADDED_LISTENER = 'ADD_DECK_CARD_ADDED_LISTENER'
const ADD_DECK_CARD_REMOVED_LISTENER = 'ADD_DECK_CARD_REMOVED_LISTENER'
const ADD_DECK_CARD_VALUE_LISTENER = 'ADD_DECK_CARD_VALUE_LISTENER'
const ADD_CARD_HISTORY_ADDED_LISTENER = 'ADD_CARD_HISTORY_ADDED_LISTENER'
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
const REMOVE_CARD_HISTORY_VALUE_LISTENER = 'REMOVE_CARD_HISTORY_VALUE_LISTENER'

// thunks
// Note: Should not disable auth state changed listener
export function disableAndRemoveAllListeners() {
  return (dispatch, getState, firebaseContext) => {
    const { users, decks, cards } = getState()

    users.get('users').forEach((user, uid) => {
      dispatch(removeUserValueListenerFlag(uid))
      removeUserValueListener(firebaseContext, uid)

      dispatch(removeUserDeckAddedListenerFlag(uid))
      removeUserDeckAddedListener(firebaseContext, uid)

      dispatch(removeUserDeckRemovedListenerFlag(uid))
      removeUserDeckRemovedListener(firebaseContext, uid)

      user.get('decks').forEach((deck, deckId) => {
        dispatch(removeUserDeckValueListenerFlag(uid, deckId))
        removeUserDeckValueListener(firebaseContext, uid, deckId)

        dispatch(removeDeckCardAddedListenerFlag(deckId))
        removeDeckCardAddedListener(firebaseContext, uid, deckId)

        dispatch(removeDeckCardRemovedListenerFlag(deckId))
        removeDeckCardRemovedListener(firebaseContext, uid, deckId)

        decks.getIn(['decks', deckId, 'cards']).forEach((card, cardId) => {
          dispatch(removeDeckCardValueListenerFlag(deckId, cardId))
          removeDeckCardValueListener(firebaseContext, uid, deckId, cardId)
        })
      })
    })
  }
}

export function setUserValueListenerAndFlag(uid, onSuccess, onFailure) {
  return (dispatch, getState, firebaseContext) => {
    dispatch(addUserValueListenerFlag(uid))
    setUserValueListener(firebaseContext, uid, onSuccess, onFailure)
  }
}

export function setUserDeckAddedListenerAndFlag(uid, onSuccess, onFailure) {
  return (dispatch, getState, firebaseContext) => {
    dispatch(addUserDeckAddedListenerFlag(uid))
    setUserDeckAddedListener(firebaseContext, uid, onSuccess, onFailure)
  }
}

export function setUserDeckRemovedListenerAndFlag(uid, onSuccess, onFailure) {
  return (dispatch, getState, firebaseContext) => {
    dispatch(addUserDeckRemovedListenerFlag(uid))
    setUserDeckRemovedListener(firebaseContext, uid, onSuccess, onFailure)
  }
}

export function setUserDeckValueListenerAndFlag(uid, deckId, onSuccess, onFailure) {
  return (dispatch, getState, firebaseContext) => {
    dispatch(addUserDeckValueListenerFlag(uid, deckId))
    setUserDeckValueListener(firebaseContext, uid, deckId, onSuccess, onFailure)
  }
}

export function setDeckCardAddedListenerAndFlag(uid, deckId, onSuccess, onFailure) {
  return (dispatch, getState, firebaseContext) => {
    dispatch(addDeckCardAddedListenerFlag(deckId))
    setDeckCardAddedListener(firebaseContext, uid, deckId, onSuccess, onFailure)
  }
}

export function setDeckCardRemovedListenerAndFlag(uid, deckId, onSuccess, onFailure) {
  return (dispatch, getState, firebaseContext) => {
    dispatch(addDeckCardRemovedListenerFlag(deckId))
    setDeckCardRemovedListener(firebaseContext, uid, deckId, onSuccess, onFailure)
  }
}

export function setDeckCardValueListenerAndFlag(uid, deckId, cardId, onSuccess, onFailure) {
  return (dispatch, getState, firebaseContext) => {
    dispatch(addDeckCardValueListenerFlag(deckId, cardId))
    setDeckCardValueListener(firebaseContext, uid, deckId, cardId, onSuccess, onFailure)
  }
}

export function setCardHistoryAddedListenerAndFlag(uid, deckId, onSuccess, onFailure) {
  return (dispatch, getState, firebaseContext) => {
    dispatch(addCardHistoryAddedListenerFlag(deckId))
    setCardHistoryAddedListener(firebaseContext, uid, deckId, onSuccess, onFailure)
  }
}

export function setCardHistoryRemovedListenerAndFlag(uid, deckId, onSuccess, onFailure) {
  return (dispatch, getState, firebaseContext) => {
    dispatch(addCardHistoryRemovedListenerFlag(deckId))
    setCardHistoryRemovedListener(firebaseContext, uid, deckId, onSuccess, onFailure)
  }
}

export function setCardHistoryValueListenerAndFlag(uid, deckId, cardId, onSuccess, onFailure) {
  return (dispatch, getState, firebaseContext) => {
    dispatch(addCardHistoryValueListenerFlag(deckId, cardId))
    setCardHistoryValueListener(firebaseContext, uid, deckId, cardId, onSuccess, onFailure)
  }
}

// action creators
export function addUserValueListenerFlag(uid) {
  return {
    type: ADD_USER_VALUE_LISTENER,
    uid,
  }
}

export function addUserDeckAddedListenerFlag(uid) {
  return {
    type: ADD_USER_DECK_ADDED_LISTENER,
    uid,
  }
}

export function addUserDeckRemovedListenerFlag(uid) {
  return {
    type: ADD_USER_DECK_REMOVED_LISTENER,
    uid,
  }
}

export function addUserDeckValueListenerFlag(uid, deckId) {
  return {
    type: ADD_USER_DECK_VALUE_LISTENER,
    uid,
    deckId,
  }
}

export function addDeckCardAddedListenerFlag(deckId) {
  return {
    type: ADD_DECK_CARD_ADDED_LISTENER,
    deckId,
  }
}

export function addDeckCardRemovedListenerFlag(deckId) {
  return {
    type: ADD_DECK_CARD_REMOVED_LISTENER,
    deckId,
  }
}

export function addDeckCardValueListenerFlag(deckId, cardId) {
  return {
    type: ADD_DECK_CARD_VALUE_LISTENER,
    deckId,
    cardId,
  }
}

export function addCardHistoryAddedListenerFlag(deckId) {
  return {
    type: ADD_CARD_HISTORY_ADDED_LISTENER,
    deckId,
  }
}

export function addCardHistoryValueListenerFlag(deckId, cardId) {
  return {
    type: ADD_CARD_HISTORY_VALUE_LISTENER,
    deckId,
    cardId,
  }
}

export function addAuthStateChangedListenerFlag() {
  return {
    type: ADD_AUTH_STATE_CHANGED_LISTENER
  }
}

export function removeUserValueListenerFlag(uid) {
  return {
    type: REMOVE_USER_VALUE_LISTENER,
    uid,
  }
}

export function removeUserDeckAddedListenerFlag(uid) {
  return {
    type: REMOVE_USER_DECK_ADDED_LISTENER,
    uid,
  }
}

export function removeUserDeckRemovedListenerFlag(uid) {
  return {
    type: REMOVE_USER_DECK_REMOVED_LISTENER,
    uid,
  }
}

export function removeUserDeckValueListenerFlag(uid, deckId) {
  return {
    type: REMOVE_USER_DECK_VALUE_LISTENER,
    uid,
    deckId,
  }
}

export function removeDeckCardAddedListenerFlag(deckId) {
  return {
    type: REMOVE_DECK_CARD_ADDED_LISTENER,
    deckId,
  }
}

export function removeDeckCardRemovedListenerFlag(deckId) {
  return {
    type: REMOVE_DECK_CARD_REMOVED_LISTENER,
    deckId,
  }
}

export function removeDeckCardValueListenerFlag(deckId, cardId) {
  return {
    type: REMOVE_DECK_CARD_VALUE_LISTENER,
    deckId,
    cardId,
  }
}

export function removeCardHistoryAddedListenerFlag(deckId) {
  return {
    type: REMOVE_CARD_HISTORY_ADDED_LISTENER,
    deckId,
  }
}

export function removeCardHistoryValueListenerFlag(deckId, cardId) {
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
  histories: Map(),
})

function cardHistories(state = initialCardHistoriesState, action) {
  switch(action.type) {
    case ADD_CARD_HISTORY_ADDED_LISTENER:
      return state.set('added', true)
    case ADD_CARD_HISTORY_VALUE_LISTENER:
      return state.setIn(['histories', action.cardId], true)
    case REMOVE_CARD_HISTORY_ADDED_LISTENER:
      return state.set('added', false)
    case REMOVE_CARD_HISTORY_VALUE_LISTENER:
      return state.deleteIn(['histories', action.cardId])
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
    case ADD_CARD_HISTORY_ADDED_LISTENER:
    case ADD_CARD_HISTORY_VALUE_LISTENER:
      path = ['cardHistories', action.deckId]
      return state.setIn(path, cardHistories(state.getIn(path), action))
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
    case REMOVE_CARD_HISTORY_ADDED_LISTENER:
    case REMOVE_CARD_HISTORY_VALUE_LISTENER:
      path = ['cardHistories', action.deckId]
      return state.setIn(path, cardHistories(state.getIn(path), action))
    default:
      return state
  }
}