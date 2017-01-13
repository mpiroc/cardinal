import 'babel-polyfill'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import sinon from 'sinon'
import { authUser } from 'redux/modules/auth'
import createStoreMock from '../../testUtils/createStoreMock'
import listenersReducer, {
  disableAndRemoveAllListeners,
  addUserValueListener,
  addUserDeckAddedListener,
  addUserDeckRemovedListener,
  addUserDeckValueListener,
  addDeckCardAddedListener,
  addDeckCardRemovedListener,
  addDeckCardValueListener,
  addAuthStateChangedListener,
  removeUserValueListener,
  removeUserDeckAddedListener,
  removeUserDeckRemovedListener,
  removeUserDeckValueListener,
  removeDeckCardAddedListener,
  removeDeckCardRemovedListener,
  removeDeckCardValueListener,
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

        store.dispatch(addUserValueListener('myUid'))
        store.dispatch(addUserDeckAddedListener('myUid'))
        store.dispatch(addUserDeckRemovedListener('myUid'))
        store.dispatch(addUserDeckValueListener('myUid', 'myDeckId'))
        store.dispatch(addDeckCardAddedListener('myDeckId'))
        store.dispatch(addDeckCardRemovedListener('myDeckId'))
        store.dispatch(addDeckCardValueListener('myDeckId', 'myCardId'))
        store.dispatch(disableAndRemoveAllListeners())

        const listeners = store.getState().listeners

        expect(listeners.get('users').size).to.equal(0)

        listeners.get('userDecks').forEach((userDeck, uid) => {
          expect(userDeck.get('added')).to.be.false
          expect(userDeck.get('removed')).to.be.false
          expect(userDeck.get('decks').size).to.equal(0)
        })

        listeners.get('deckCards').forEach((deckCard, deckId) => {
          expect(deckCard.get('added')).to.be.false
          expect(deckCard.get('removed')).to.be.false
          expect(deckCard.get('cards').size).to.equal(0)
        })
      })
    })
  })

  describe('action creator', function() {
    describe('addUserValueListener', function() {
      it('should exist', function() {
        expect(addUserValueListener).to.exist
      })

      it('should set the correct listener flag', function() {
        store.dispatch(addUserValueListener('myUid'))

        expect(store.getState().listeners.getIn(['users', 'myUid'])).to.be.true
      })
    })
    
    describe('addUserDeckAddedListener', function() {
      it('should exist', function() {
        expect(addUserDeckAddedListener).to.exist
      })

      it('should set the correct listener flag', function() {
        store.dispatch(addUserDeckAddedListener('myUid'))

        expect(store.getState().listeners.getIn(['userDecks', 'myUid', 'added'])).to.be.true
      })
    })
    
    describe('addUserDeckRemovedListener', function() {
      it('should exist', function() {
        expect(addUserDeckRemovedListener).to.exist
      })

      it('should set the correct listener flag', function() {
        store.dispatch(addUserDeckRemovedListener('myUid'))

        expect(store.getState().listeners.getIn(['userDecks', 'myUid', 'removed'])).to.be.true
      })
    })
    
    describe('addUserDeckValueListener', function() {
      it('should exist', function() {
        expect(addUserDeckValueListener).to.exist
      })

      it('should set the correct listener flag', function() {
        store.dispatch(addUserDeckValueListener('myUid', 'myDeckId'))

        expect(store.getState().listeners.getIn(['userDecks', 'myUid', 'decks', 'myDeckId'])).to.be.true
      })
    })
    
    describe('addDeckCardAddedListener', function() {
      it('should exist', function() {
        expect(addDeckCardAddedListener).to.exist
      })

      it('should set the correct listener flag', function() {
        store.dispatch(addDeckCardAddedListener('myDeckId'))

        expect(store.getState().listeners.getIn(['deckCards', 'myDeckId', 'added'])).to.be.true
      })
    })
    
    describe('addDeckCardRemovedListener', function() {
      it('should exist', function() {
        expect(addDeckCardRemovedListener).to.exist
      })

      it('should set the correct listener flag', function() {
        store.dispatch(addDeckCardRemovedListener('myDeckId'))

        expect(store.getState().listeners.getIn(['deckCards', 'myDeckId', 'removed'])).to.be.true
      })
    })
    
    describe('addDeckCardValueListener', function() {
      it('should exist', function() {
        expect(addDeckCardValueListener).to.exist
      })

      it('should set the correct listener flag', function() {
        store.dispatch(addDeckCardValueListener('myDeckId', 'myCardId'))

        expect(store.getState().listeners.getIn(['deckCards', 'myDeckId', 'cards', 'myCardId'])).to.be.true
      })
    })
    
    describe('addAuthStateChangedListener', function() {
      it('should exist', function() {
        expect(addAuthStateChangedListener).to.exist
      })
    })
    
    describe('removeUserValueListener', function() {
      it('should exist', function() {
        expect(removeUserValueListener).to.exist
      })

      it('should remove the correct listener flag', function() {
        store.dispatch(addUserValueListener('myUid'))
        store.dispatch(removeUserValueListener('myUid'))

        expect(store.getState().listeners.getIn(['users', 'myUid'])).to.not.exist
      })
    })
    
    describe('removeUserDeckAddedListener', function() {
      it('should exist', function() {
        expect(removeUserDeckAddedListener).to.exist
      })

      it('should remove the correct listener flag', function() {
        store.dispatch(addUserDeckAddedListener('myUid'))
        store.dispatch(removeUserDeckAddedListener('myUid'))

        expect(store.getState().listeners.getIn(['userDecks', 'myUid', 'added'])).to.be.false
      })
    })
    
    describe('removeUserDeckRemovedListener', function() {
      it('should exist', function() {
        expect(removeUserDeckRemovedListener).to.exist
      })

      it('should set the correct listener flag', function() {
        store.dispatch(addUserDeckRemovedListener('myUid'))
        store.dispatch(removeUserDeckRemovedListener('myUid'))

        expect(store.getState().listeners.getIn(['userDecks', 'myUid', 'removed'])).to.be.false
      })
    })
    
    describe('removeUserDeckValueListener', function() {
      it('should exist', function() {
        expect(removeUserDeckValueListener).to.exist
      })

      it('should set the correct listener flag', function() {
        store.dispatch(addUserDeckValueListener('myUid', 'myDeckId'))
        store.dispatch(removeUserDeckValueListener('myUid', 'myDeckId'))

        expect(store.getState().listeners.getIn(['userDecks', 'myUid', 'decks', 'myDeckId'])).to.not.exist
      })
    })
    
    describe('removeDeckCardAddedListener', function() {
      it('should exist', function() {
        expect(removeDeckCardAddedListener).to.exist
      })

      it('should set the correct listener flag', function() {
        store.dispatch(addDeckCardAddedListener('myDeckId'))
        store.dispatch(removeDeckCardAddedListener('myDeckId'))

        expect(store.getState().listeners.getIn(['deckCards', 'myDeckId', 'added'])).to.be.false
      })
    })
    
    describe('removeDeckCardRemovedListener', function() {
      it('should exist', function() {
        expect(removeDeckCardRemovedListener).to.exist
      })

      it('should set the correct listener flag', function() {
        store.dispatch(addDeckCardRemovedListener('myDeckId'))
        store.dispatch(removeDeckCardRemovedListener('myDeckId'))

        expect(store.getState().listeners.getIn(['deckCards', 'myDeckId', 'removed'])).to.be.false
      })
    })
    
    describe('removeDeckCardValueListener', function() {
      it('should exist', function() {
        expect(removeDeckCardValueListener).to.exist
      })

      it('should set the correct listener flag', function() {
        store.dispatch(addDeckCardValueListener('myDeckId', 'myCardId'))
        store.dispatch(removeDeckCardValueListener('myDeckId', 'myCardId'))

        expect(store.getState().listeners.getIn(['deckCards', 'myDeckId', 'cards', 'myCardId'])).to.not.exist
      })
    })
  })
})