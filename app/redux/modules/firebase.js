// This module contains only thunks--it does not export a reducer, and therefore should not be be added to ./index.js

import * as fb from 'helpers/firebase'
import {
  setDataListenerAndFlag,
  removeDataListenerAndFlag,
} from './listeners'
import * as usersModule from './users'
import * as decksModule from './decks'
import * as cardsModule from './cards'

export function setAndHandleUserValueListener(uid) {
  return (dispatch, getState, firebaseContext) => {
    const { listeners } = getState()
    const path = fb.getUserPath(uid)
    const event = 'value'

    if (listeners.getIn(['data', path, event]) !== true) {
      dispatch(usersModule.settingUserValueListener(uid))
      dispatch(setDataListenerAndFlag(path, event,
        user => dispatch(usersModule.settingUserValueListenerSuccess(uid, user)),
        error => dispatch(usersModule.settingUserValueListenerFailure(uid, error)),
      ))
    }
  }
}

export function setAndHandleUserDeckCollectionListeners(uid) {
  return (dispatch, getState, firebaseContext) => {
    const { listeners } = getState()
    const path = fb.getUserDeckCollectionPath(uid)

    if (listeners.getIn(['data', path, 'child_added']) !== true) {
      dispatch(setDataListenerAndFlag(path, 'child_added',
        deck => {
          dispatch(usersModule.userDeckAddedReceived(uid, deck.deckId))
          dispatch(decksModule.updateDeck(deck.deckId, deck))
          dispatch(setAndHandleUserDeckValueListener(uid, deck.deckId))
        },
        error => dispatch(usersModule.settingAddOrRemoveUserDeckListenerFailure(uid, error)),
      ))
    }

    if (listeners.getIn(['data', path, 'child_removed']) !== true) {
      dispatch(setDataListenerAndFlag(path, 'child_removed',
        deck => {
          dispatch(usersModule.userDeckRemovedReceived(uid, deck.deckId))
          dispatch(decksModule.removeDeck(deck.deckId))
        },
        error => dispatch(usersModule.settingAddOrRemoveUserDeckListenerFailure(uid, error)),
      ))
    }
  }
}

export function setAndHandleUserDeckValueListener(uid, deckId) {
  return (dispatch, getState, firebaseContext) => {
    const { listeners } = getState()
    const path = fb.getUserDeckPath(uid, deckId)
    const event = 'value'

    if (listeners.getIn(['data', path, event]) !== true) {
      dispatch(decksModule.settingDeckValueListener(deckId))
      dispatch(setDataListenerAndFlag(path, event,
        deck => dispatch(decksModule.settingDeckValueListenerSuccess(deckId, deck)),
        error => dispatch(decksModule.settingDeckValueListenerFailure(deckId, error.message)),
      ))
    }
  }
}

export function setAndHandleDeckCardCollectionListeners(deckId) {
  return (dispatch, getState, firebaseContext) => {
    const { auth, listeners } = getState()
    const uid = auth.get('authedUid')
    const path = fb.getDeckCardCollectionPath(uid, deckId)

    if (listeners.getIn(['data', path, 'child_added']) !== true) {
      dispatch(setDataListenerAndFlag(path, 'child_added',
        card => {
          dispatch(decksModule.deckCardAddedReceived(deckId, card.cardId))
          dispatch(cardsModule.updateCard(card.cardId, card))
          dispatch(setAndHandleDeckCardValueListener(deckId, card.cardId))
        },
        error => dispatch(decksModule.settingAddOrRemoveDeckCardListenerFailure(deckId, error.message)),
      ))
    }

    if (listeners.getIn(['data', path, 'child_removed']) !== true) {
      dispatch(setDataListenerAndFlag(path, 'child_removed',
        card => {
          dispatch(decksModule.deckCardRemovedReceived(deckId, card.cardId))
          dispatch(cardsModule.removeCard(card.cardId))
        },
        error => dispatch(decksModule.settingAddOrRemoveDeckCardListenerFailure(deckId, error.message)),
      ))
    }
  }
}

export function setAndHandleDeckCardValueListener(deckId, cardId) {
  return (dispatch, getState, firebaseContext) => {
    const { auth, listeners } = getState()
    const uid = auth.get('authedUid')
    const path = fb.getDeckCardPath(uid, deckId, cardId)
    const event = 'value'

    if (listeners.getIn(['data', path, event]) !== true) {
      dispatch(cardsModule.settingCardValueListener(cardId))
      dispatch(setDataListenerAndFlag(path, event,
        card => dispatch(cardsModule.settingCardValueListenerSuccess(cardId, card)),
        error => dispatch(cardsModule.settingCardValueListenerFailure(cardId, error)),
      ))
    }
  }
}

export function setAndHandleCardHistoryCollectionListeners(deckId) {
  return (dispatch, getState, firebaseContext) => {
    const { auth, listeners } = getState()
    const uid = auth.get('authedUid')
    const path = fb.getCardHistoryCollectionPath(uid, deckId)

    if (listeners.getIn(['data'], path, 'child_added') !== true) {
      dispatch(setDataListenerAndFlag(path, 'child_added',
        (history, cardId) => {
          dispatch(cardsModule.updateCardHistory(cardId, history))
          dispatch(setAndHandleCardHistoryValueListener(deckId, cardId))
        },
        error => dispatch(decksModule.settingAddCardHistoryListenerFailure(deckId, error.message)),
      ))
    }
  }
}

export function setAndHandleCardHistoryValueListener(deckId, cardId) {
  return (dispatch, getState, firebaseContext) => {
    const { auth, listeners } = getState()
    const uid = auth.get('authedUid')
    const path = fb.getCardHistoryPath(uid, deckId, cardId)
    const event = 'value'

    if (listeners.getIn(['data', path, event]) !== true) {
      dispatch(cardsModule.settingCardHistoryValueListener(cardId))
      dispatch(setDataListenerAndFlag(path, event,
        card => dispatch(cardsModule.settingCardHistoryValueListenerSuccess(cardId, card)),
        error => dispatch(cardsModule.settingCardHistoryValueListenerFailure(cardId, error)),
      ))
    }
  }
}

export function setAndHandleCardContentCollectionListeners(deckId) {
  return (dispatch, getState, firebaseContext) => {
    const { auth, listeners } = getState()
    const uid = auth.get('authedUid')
    const path = fb.getCardContentCollectionPath(uid, deckId)

    if (listeners.getIn(['data'], path, 'child_added') !== true) {
      dispatch(setDataListenerAndFlag(path, 'child_added',
        (content, cardId) => {
          dispatch(cardsModule.updateCardContent(cardId, content))
          dispatch(setAndHandleCardContentValueListener(deckId, cardId))
        },
        error => dispatch(decksModule.settingAddCardContentListenerFailure(deckId, error.message)),
      ))
    }
  }
}

export function setAndHandleCardContentValueListener(deckId, cardId) {
  return (dispatch, getState, firebaseContext) => {
    const { auth, listeners } = getState()
    const uid = auth.get('authedUid')
    const path = fb.getCardContentPath(uid, deckId, cardId)
    const event = 'value'

    if (listeners.getIn(['data', path, event]) !== true) {
      dispatch(cardsModule.settingCardContentValueListener(cardId))
      dispatch(setDataListenerAndFlag(path, event,
        card => dispatch(cardsModule.settingCardContentValueListenerSuccess(cardId, card)),
        error => dispatch(cardsModule.settingCardContentValueListenerFailure(cardId, error)),
      ))
    }
  }
}