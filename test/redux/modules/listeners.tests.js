import 'babel-polyfill'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import sinon from 'sinon'
import { authUser } from 'redux/modules/auth'
import createStoreMock from '../../testUtils/createStoreMock'
import listenersReducer, {
  disableAndRemoveAllListeners,
  addUserValueListenerFlag,
  addUserDeckAddedListenerFlag,
  addUserDeckRemovedListenerFlag,
  addUserDeckValueListenerFlag,
  addDeckCardAddedListenerFlag,
  addDeckCardRemovedListenerFlag,
  addDeckCardValueListenerFlag,
  addCardHistoryAddedListenerFlag,
  addCardHistoryValueListenerFlag,
  addAuthStateChangedListenerFlag,
  removeUserValueListenerFlag,
  removeUserDeckAddedListenerFlag,
  removeUserDeckRemovedListenerFlag,
  removeUserDeckValueListenerFlag,
  removeDeckCardAddedListenerFlag,
  removeDeckCardRemovedListenerFlag,
  removeDeckCardValueListenerFlag,
  removeCardHistoryAddedListenerFlag,
  removeCardHistoryValueListenerFlag,
} from 'redux/modules/listeners'
import {
  updateUser,
  userDeckAddedReceived,
} from 'redux/modules/users'
import {
  updateDeck,
  deckCardAddedReceived,
} from 'redux/modules/decks'

chai.use(sinonChai)

describe('listeners', function() {
  let store
  beforeEach(function() {
    store = createStoreMock()
  })

  describe('thunk', function() {
    describe('disableAndRemoveAllListeners', function() {
      it('should exist', function() {
        expect(disableAndRemoveAllListeners).to.exist
      })

      it('should remove all listeners', function() {
        store.dispatch(authUser('myUid'))

        store.dispatch(updateUser('myUid', {}))
        store.dispatch(userDeckAddedReceived('myUid', 'myDeckId'))
        store.dispatch(updateDeck('myDeckId', {}))
        store.dispatch(deckCardAddedReceived('myDeckId', 'myCardId'))

        store.dispatch(addUserValueListenerFlag('myUid'))
        store.dispatch(addUserDeckAddedListenerFlag('myUid'))
        store.dispatch(addUserDeckRemovedListenerFlag('myUid'))
        store.dispatch(addUserDeckValueListenerFlag('myUid', 'myDeckId'))
        store.dispatch(addDeckCardAddedListenerFlag('myDeckId'))
        store.dispatch(addDeckCardRemovedListenerFlag('myDeckId'))
        store.dispatch(addDeckCardValueListenerFlag('myDeckId', 'myCardId'))
        store.dispatch(disableAndRemoveAllListeners())

        const listeners = store.getState().listeners

        expect(listeners.get('users').size).to.equal(0)

        listeners.get('userDecks').forEach(userDeck => {
          expect(userDeck.get('added')).to.be.false
          expect(userDeck.get('removed')).to.be.false
          expect(userDeck.get('decks').size).to.equal(0)
        })

        listeners.get('deckCards').forEach(deckCard => {
          expect(deckCard.get('added')).to.be.false
          expect(deckCard.get('removed')).to.be.false
          expect(deckCard.get('cards').size).to.equal(0)
        })

        listeners.get('cardHistories').forEach(cardHistory => {
          expect(cardHistory.get('added')).to.be.false
          expect(cardHistory.get('cardHistories').size).to.equal(0)
        })
      })
    })
  })

  describe('action creator', function() {
    describe('addUserValueListenerFlag', function() {
      it('should exist', function() {
        expect(addUserValueListenerFlag).to.exist
      })

      it('should set the correct listener flag', function() {
        store.dispatch(addUserValueListenerFlag('myUid'))

        expect(store.getState().listeners.getIn(['users', 'myUid'])).to.be.true
      })
    })
    
    describe('addUserDeckAddedListenerFlag', function() {
      it('should exist', function() {
        expect(addUserDeckAddedListenerFlag).to.exist
      })

      it('should set the correct listener flag', function() {
        store.dispatch(addUserDeckAddedListenerFlag('myUid'))

        expect(store.getState().listeners.getIn(['userDecks', 'myUid', 'added'])).to.be.true
      })
    })
    
    describe('addUserDeckRemovedListenerFlag', function() {
      it('should exist', function() {
        expect(addUserDeckRemovedListenerFlag).to.exist
      })

      it('should set the correct listener flag', function() {
        store.dispatch(addUserDeckRemovedListenerFlag('myUid'))

        expect(store.getState().listeners.getIn(['userDecks', 'myUid', 'removed'])).to.be.true
      })
    })
    
    describe('addUserDeckValueListenerFlag', function() {
      it('should exist', function() {
        expect(addUserDeckValueListenerFlag).to.exist
      })

      it('should set the correct listener flag', function() {
        store.dispatch(addUserDeckValueListenerFlag('myUid', 'myDeckId'))

        expect(store.getState().listeners.getIn(['userDecks', 'myUid', 'decks', 'myDeckId'])).to.be.true
      })
    })
    
    describe('addDeckCardAddedListenerFlag', function() {
      it('should exist', function() {
        expect(addDeckCardAddedListenerFlag).to.exist
      })

      it('should set the correct listener flag', function() {
        store.dispatch(addDeckCardAddedListenerFlag('myDeckId'))

        expect(store.getState().listeners.getIn(['deckCards', 'myDeckId', 'added'])).to.be.true
      })
    })
    
    describe('addDeckCardRemovedListenerFlag', function() {
      it('should exist', function() {
        expect(addDeckCardRemovedListenerFlag).to.exist
      })

      it('should set the correct listener flag', function() {
        store.dispatch(addDeckCardRemovedListenerFlag('myDeckId'))

        expect(store.getState().listeners.getIn(['deckCards', 'myDeckId', 'removed'])).to.be.true
      })
    })
    
    describe('addDeckCardValueListenerFlag', function() {
      it('should exist', function() {
        expect(addDeckCardValueListenerFlag).to.exist
      })

      it('should set the correct listener flag', function() {
        store.dispatch(addDeckCardValueListenerFlag('myDeckId', 'myCardId'))

        expect(store.getState().listeners.getIn(['deckCards', 'myDeckId', 'cards', 'myCardId'])).to.be.true
      })
    })

    describe('addCardHistoryAddedListenerFlag', function() {
      it('should exist', function() {
        expect(addCardHistoryAddedListenerFlag).to.exist
      })

      it('should set the correct listener flag', function() {
        store.dispatch(addCardHistoryAddedListenerFlag('myDeckId'))

        expect(store.getState().listeners.getIn(['cardHistories', 'myDeckId', 'added'])).to.be.true
      })
    })
    
    describe('addCardHistoryValueListenerFlag', function() {
      it('should exist', function() {
        expect(addCardHistoryValueListenerFlag).to.exist
      })

      it('should set the correct listener flag', function() {
        store.dispatch(addCardHistoryValueListenerFlag('myDeckId', 'myCardId'))

        expect(store.getState().listeners.getIn(['cardHistories', 'myDeckId', 'histories', 'myCardId'])).to.be.true
      })
    })
    
    describe('addAuthStateChangedListenerFlag', function() {
      it('should exist', function() {
        expect(addAuthStateChangedListenerFlag).to.exist
      })
    })
    
    describe('removeUserValueListenerFlag', function() {
      it('should exist', function() {
        expect(removeUserValueListenerFlag).to.exist
      })

      it('should remove the correct listener flag', function() {
        store.dispatch(addUserValueListenerFlag('myUid'))
        store.dispatch(removeUserValueListenerFlag('myUid'))

        expect(store.getState().listeners.getIn(['users', 'myUid'])).to.not.exist
      })
    })
    
    describe('removeUserDeckAddedListenerFlag', function() {
      it('should exist', function() {
        expect(removeUserDeckAddedListenerFlag).to.exist
      })

      it('should remove the correct listener flag', function() {
        store.dispatch(addUserDeckAddedListenerFlag('myUid'))
        store.dispatch(removeUserDeckAddedListenerFlag('myUid'))

        expect(store.getState().listeners.getIn(['userDecks', 'myUid', 'added'])).to.be.false
      })
    })
    
    describe('removeUserDeckRemovedListenerFlag', function() {
      it('should exist', function() {
        expect(removeUserDeckRemovedListenerFlag).to.exist
      })

      it('should set the correct listener flag', function() {
        store.dispatch(addUserDeckRemovedListenerFlag('myUid'))
        store.dispatch(removeUserDeckRemovedListenerFlag('myUid'))

        expect(store.getState().listeners.getIn(['userDecks', 'myUid', 'removed'])).to.be.false
      })
    })
    
    describe('removeUserDeckValueListenerFlag', function() {
      it('should exist', function() {
        expect(removeUserDeckValueListenerFlag).to.exist
      })

      it('should set the correct listener flag', function() {
        store.dispatch(addUserDeckValueListenerFlag('myUid', 'myDeckId'))
        store.dispatch(removeUserDeckValueListenerFlag('myUid', 'myDeckId'))

        expect(store.getState().listeners.getIn(['userDecks', 'myUid', 'decks', 'myDeckId'])).to.not.exist
      })
    })
    
    describe('removeDeckCardAddedListenerFlag', function() {
      it('should exist', function() {
        expect(removeDeckCardAddedListenerFlag).to.exist
      })

      it('should set the correct listener flag', function() {
        store.dispatch(addDeckCardAddedListenerFlag('myDeckId'))
        store.dispatch(removeDeckCardAddedListenerFlag('myDeckId'))

        expect(store.getState().listeners.getIn(['deckCards', 'myDeckId', 'added'])).to.be.false
      })
    })
    
    describe('removeDeckCardRemovedListenerFlag', function() {
      it('should exist', function() {
        expect(removeDeckCardRemovedListenerFlag).to.exist
      })

      it('should set the correct listener flag', function() {
        store.dispatch(addDeckCardRemovedListenerFlag('myDeckId'))
        store.dispatch(removeDeckCardRemovedListenerFlag('myDeckId'))

        expect(store.getState().listeners.getIn(['deckCards', 'myDeckId', 'removed'])).to.be.false
      })
    })
    
    describe('removeDeckCardValueListenerFlag', function() {
      it('should exist', function() {
        expect(removeDeckCardValueListenerFlag).to.exist
      })

      it('should set the correct listener flag', function() {
        store.dispatch(addDeckCardValueListenerFlag('myDeckId', 'myCardId'))
        store.dispatch(removeDeckCardValueListenerFlag('myDeckId', 'myCardId'))

        expect(store.getState().listeners.getIn(['deckCards', 'myDeckId', 'cards', 'myCardId'])).to.not.exist
      })
    })

    describe('removeCardHistoryAddedListenerFlag', function() {
      it('should exist', function() {
        expect(removeCardHistoryAddedListenerFlag).to.exist
      })

      it('should set the correct listener flag', function() {
        store.dispatch(addCardHistoryAddedListenerFlag('myDeckId'))
        store.dispatch(removeCardHistoryAddedListenerFlag('myDeckId'))

        expect(store.getState().listeners.getIn(['cardHistories', 'myDeckId', 'added'])).to.be.false
      })
    })
    
    describe('removeCardHistoryValueListenerFlag', function() {
      it('should exist', function() {
        expect(removeCardHistoryValueListenerFlag).to.exist
      })

      it('should set the correct listener flag', function() {
        store.dispatch(addCardHistoryValueListenerFlag('myDeckId', 'myCardId'))
        store.dispatch(removeCardHistoryValueListenerFlag('myDeckId', 'myCardId'))

        expect(store.getState().listeners.getIn(['cardHistories', 'myDeckId', 'cards', 'myCardId'])).to.not.exist
      })
    })
  })
})