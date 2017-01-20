import { Map } from 'immutable'
import * as fb from 'helpers/firebase'
import * as usersModule from './users'
import * as decksModule from './decks'
import * as cardsModule from './cards'

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
      fb.removeUserValueListener(firebaseContext, uid)

      dispatch(removeUserDeckAddedListenerFlag(uid))
      fb.removeUserDeckAddedListener(firebaseContext, uid)

      dispatch(removeUserDeckRemovedListenerFlag(uid))
      fb.removeUserDeckRemovedListener(firebaseContext, uid)

      user.get('decks').forEach((deck, deckId) => {
        dispatch(removeUserDeckValueListenerFlag(uid, deckId))
        fb.removeUserDeckValueListener(firebaseContext, uid, deckId)

        dispatch(removeDeckCardAddedListenerFlag(deckId))
        fb.removeDeckCardAddedListener(firebaseContext, uid, deckId)

        dispatch(removeDeckCardRemovedListenerFlag(deckId))
        fb.removeDeckCardRemovedListener(firebaseContext, uid, deckId)

        decks.getIn(['decks', deckId, 'cards']).forEach((card, cardId) => {
          dispatch(removeDeckCardValueListenerFlag(deckId, cardId))
          fb.removeDeckCardValueListener(firebaseContext, uid, deckId, cardId)
        })
      })
    })
  }
}

export function setAndHandleUserValueListener(uid) {
  return (dispatch, getState, firebaseContext) => {
    const state = getState().listeners

    if (state.getIn(['users', uid]) !== true) {
      dispatch(addUserValueListenerFlag(uid))
      dispatch(usersModule.settingUserValueListener(uid))
      fb.setUserValueListener(
        firebaseContext,
        uid,
        user => dispatch(usersModule.settingUserValueListenerSuccess(uid, user)),
        error => dispatch(usersModule.settingUserValueListenerFailure(uid, error)),
      )
    }
  }
}

export function setAndHandleUserDeckCollectionListeners(uid) {
  return (dispatch, getState, firebaseContext) => {
    const { listeners } = getState()

    if (listeners.getIn(['userDecks', uid, 'added']) !== true) {
      dispatch(addUserDeckAddedListenerFlag(uid))
      fb.setUserDeckAddedListener(
        firebaseContext,
        uid,
        deck => {
          dispatch(usersModule.userDeckAddedReceived(uid, deck.deckId))
          dispatch(decksModule.updateDeck(deck.deckId, deck))
          dispatch(setAndHandleUserDeckValueListener(uid, deck.deckId))
          dispatch(setAndHandleDeckCardCollectionListeners(deck.deckId))
        },
        error => dispatch(usersModule.settingAddOrRemoveUserDeckListenerFailure(uid, error)),
      )
    }

    if (listeners.getIn(['userDecks', uid, 'removed']) !== true) {
      dispatch(addUserDeckRemovedListenerFlag(uid))
      fb.setUserDeckRemovedListener(
        firebaseContext,
        uid,
        deck => {
          dispatch(usersModule.userDeckRemovedReceived(uid, deck.deckId))
          dispatch(decksModule.removeDeck(deck.deckId))
        },
        error => dispatch(usersModule.settingAddOrRemoveUserDeckListenerFailure(uid, error)),
      )
    }
  }
}

export function setAndHandleUserDeckValueListener(uid, deckId) {
  return (dispatch, getState, firebaseContext) => {
    const { listeners } = getState()

    if (listeners.getIn(['userDecks', uid, 'decks', deckId]) !== true) {
      dispatch(addUserDeckValueListenerFlag(uid, deckId))
      dispatch(decksModule.settingDeckValueListener(deckId))
      fb.setUserDeckValueListener(
        firebaseContext,
        uid, deckId,
        deck => dispatch(decksModule.settingDeckValueListenerSuccess(deckId, deck)),
        error => dispatch(decksModule.settingDeckValueListenerFailure(deckId, error.message)),
      )
    }
  }
}

export function setAndHandleDeckCardCollectionListeners(deckId) {
  return (dispatch, getState, firebaseContext) => {
    const { auth, listeners } = getState()
    const uid = auth.get('authedUid')

    if (listeners.getIn(['deckCards', deckId, 'added']) !== true) {
      dispatch(addDeckCardAddedListenerFlag(deckId))
      fb.setDeckCardAddedListener(
        firebaseContext,
        uid, deckId,
        card => {
          dispatch(decksModule.deckCardAddedReceived(deckId, card.cardId))
          dispatch(cardsModule.updateCard(card.cardId, card))
          dispatch(setAndHandleDeckCardValueListener(deckId, card.cardId))
        },
        error => dispatch(decksModule.settingAddOrRemoveDeckCardListenerFailure(deckId, error.message)),
      )
    }

    if (listeners.getIn(['deckCards', deckId, 'removed']) !== true) {
      dispatch(addDeckCardRemovedListenerFlag(deckId))
      fb.setDeckCardRemovedListener(
        firebaseContext,
        uid, deckId,
        card => {
          dispatch(decksModule.deckCardRemovedReceived(deckId, card.cardId))
          dispatch(cardsModule.removeCard(card.cardId))
        },
        error => dispatch(settingAddOrRemoveDeckCardListenerFailure(deckId, error.message)),
      )
    }
  }
}

export function setAndHandleCardHistoryCollectionListeners(deckId) {
  return (dispatch, getState, firebaseContext) => {
    const { auth, listeners } = getState()
    const uid = auth.get('authedUid')

    if (listeners.getIn(['cardHistories', deckId, 'added']) !== true) {
      dispatch(addCardHistoryAddedListenerFlag(deckId))
      fb.setCardHistoryAddedListener(
        firebaseContext,
        uid, deckId,
        (history, cardId) => {
          dispatch(cardsModule.updateCardHistory(cardId, history))
          dispatch(setAndHandleCardHistoryValueListener(deckId, cardId))
        },
        error => dispatch(decksModule.settingAddCardHistoryListenerFailure(deckId, error.message)),
      )
    }
  }
}

export function setAndHandleDeckCardValueListener(deckId, cardId) {
  return (dispatch, getState, firebaseContext) => {
    const { auth, listeners } = getState()
    const uid = auth.get('authedUid')

    if (listeners.getIn(['deckCards', deckId, 'cards', cardId]) !== true) {
      dispatch(addDeckCardValueListenerFlag(deckId, cardId))
      dispatch(cardsModule.settingCardValueListener(cardId))
      fb.setDeckCardValueListener(
        firebaseContext,
        uid, deckId, cardId,
        card => dispatch(cardsModule.settingCardValueListenerSuccess(cardId, card)),
        error => dispatch(cardsModule.settingCardValueListenerFailure(cardId, error)),
      )
    }
  }
}

export function setAndHandleCardHistoryValueListener(deckId, cardId) {
  return (dispatch, getState, firebaseContext) => {
    const { auth, listeners } = getState()
    const uid = auth.get('authedUid')

    if (listeners.getIn(['cardHistories', deckId, 'histories', cardId]) !== true) {
      dispatch(addDeckCardValueListenerFlag(deckId, cardId))
      dispatch(cardsModule.settingCardHistoryValueListener(cardId))
      fb.setCardHistoryValueListener(
        firebaseContext,
        uid, deckId, cardId,
        card => dispatch(cardsModule.settingCardHistoryValueListenerSuccess(cardId, card)),
        error => dispatch(cardsModule.settingCardHistoryValueListenerFailure(cardId, error)),
      )
    }
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