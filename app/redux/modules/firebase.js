// This module contains only thunks--it does not export a reducer, and therefore should not be be added to ./index.js

import * as fb from 'helpers/firebase'
import * as listenersModule from './listeners'
import * as usersModule from './users'
import * as decksModule from './decks'
import * as cardsModule from './cards'

// Note: Should not disable auth state changed listener
export function disableAndRemoveAllListeners() {
  return (dispatch, getState, firebaseContext) => {
    const { users, decks, cards } = getState()

    users.get('users').forEach((user, uid) => {
      dispatch(listenersModule.removeUserValueListenerFlag(uid))
      fb.removeUserValueListener(firebaseContext, uid)

      dispatch(listenersModule.removeUserDeckAddedListenerFlag(uid))
      fb.removeUserDeckAddedListener(firebaseContext, uid)

      dispatch(listenersModule.removeUserDeckRemovedListenerFlag(uid))
      fb.removeUserDeckRemovedListener(firebaseContext, uid)

      user.get('decks').forEach((deck, deckId) => {
        dispatch(listenersModule.removeUserDeckValueListenerFlag(uid, deckId))
        fb.removeUserDeckValueListener(firebaseContext, uid, deckId)

        dispatch(listenersModule.removeDeckCardAddedListenerFlag(deckId))
        fb.removeDeckCardAddedListener(firebaseContext, uid, deckId)

        dispatch(listenersModule.removeDeckCardRemovedListenerFlag(deckId))
        fb.removeDeckCardRemovedListener(firebaseContext, uid, deckId)

        decks.getIn(['decks', deckId, 'cards']).forEach((card, cardId) => {
          dispatch(listenersModule.removeDeckCardValueListenerFlag(deckId, cardId))
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
      dispatch(listenersModule.addUserValueListenerFlag(uid))
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
      dispatch(listenersModule.addUserDeckAddedListenerFlag(uid))
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
      dispatch(listenersModule.addUserDeckRemovedListenerFlag(uid))
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
      dispatch(listenersModule.addUserDeckValueListenerFlag(uid, deckId))
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
      dispatch(listenersModule.addDeckCardAddedListenerFlag(deckId))
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
      dispatch(listenersModule.addDeckCardRemovedListenerFlag(deckId))
      fb.setDeckCardRemovedListener(
        firebaseContext,
        uid, deckId,
        card => {
          dispatch(decksModule.deckCardRemovedReceived(deckId, card.cardId))
          dispatch(cardsModule.removeCard(card.cardId))
        },
        error => dispatch(decksModule.settingAddOrRemoveDeckCardListenerFailure(deckId, error.message)),
      )
    }
  }
}

export function setAndHandleCardHistoryCollectionListeners(deckId) {
  return (dispatch, getState, firebaseContext) => {
    const { auth, listeners } = getState()
    const uid = auth.get('authedUid')

    if (listeners.getIn(['cardHistories', deckId, 'added']) !== true) {
      dispatch(listenersModule.addCardHistoryAddedListenerFlag(deckId))
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
      dispatch(listenersModule.addDeckCardValueListenerFlag(deckId, cardId))
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
      dispatch(listenersModule.addDeckCardValueListenerFlag(deckId, cardId))
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