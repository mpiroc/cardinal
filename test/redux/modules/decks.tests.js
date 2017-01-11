import 'babel-polyfill'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import sinon from 'sinon'
import moment from 'moment'
import { authUser } from 'redux/modules/auth'
import decksReducer, {
  deckCardAddedReceived,
  deckCardRemovedReceived,
  settingAddOrRemoveDeckCardListenerFailure,
  settingDeckValueListener,
  settingDeckValueListenerSuccess,
  settingDeckValueListenerFailure,
  deletingDeck,
  deletingDeckSuccess,
  deletingDeckFailure,
  dismissDecksSnackbar,
  updateDeck,
  removeDeck,
  decksLogout,
} from 'redux/modules/decks'
import createStoreMock from '../../testUtils/createStoreMock'

chai.use(sinonChai)

describe('redux decks module', function() {
  let store
  beforeEach(function() {
    store = createStoreMock()
  })

  it('should exist', function() {
    expect(decksReducer).to.exist
  })

  it('should initialize all properties', function() {
    const { decks } = store.getState()
    expect(decks.get('decks')).to.exist

    const snackbar = decks.get('snackbar')
    expect(snackbar).to.exist
    expect(snackbar.get('isActive')).to.be.false
    expect(snackbar.get('error')).to.equal('')
  })

  describe('action creators', function() {
    describe('deckCardAddedReceived', function() {
      it('should exist', function() {
        expect(deckCardAddedReceived).to.exist
      })

      it("should add cardId to deck's cards", function() {
        store.dispatch(deckCardAddedReceived('myDeckId', 'myCardId'))
        const card = store.getState().decks.getIn(['decks', 'myDeckId', 'cards', 'myCardId'])

        expect(card).to.exist
      })
    })
    
    describe('deckCardRemovedReceived', function() {
      it('should exist', function() {
        expect(deckCardRemovedReceived).to.exist
      })

      it("shoudl remove cardId from deck's cards", function() {
        store.dispatch(deckCardAddedReceived('myDeckId', 'myCardId'))
        store.dispatch(deckCardRemovedReceived('myDeckId', 'myCardId'))
        const card = store.getState().decks.getIn(['decks', 'myDeckId', 'cards', 'myCardId'])

        expect(card).to.not.exist
      })
    })
    
    describe('settingAddOrRemoveDeckCardListenerFailure', function() {
      it('should exist', function() {
        expect(settingAddOrRemoveDeckCardListenerFailure).to.exist
      })

      it('should show the error in the snackbar', function() {
        store.dispatch(settingAddOrRemoveDeckCardListenerFailure('myDeckId', 'myErrorMessage'))
        const snackbar = store.getState().decks.get('snackbar')

        expect(snackbar.get('isActive')).to.be.true
        expect(snackbar.get('error')).to.equal('myErrorMessage')
      })

      it('should log the error on the deck itself', function() {
        store.dispatch(settingAddOrRemoveDeckCardListenerFailure('myDeckId', 'myErrorMessage'))
        const deck = store.getState().decks.getIn(['decks', 'myDeckId'])

        expect(deck.get('addOrRemoveError')).to.equal('myErrorMessage')
      })
    })
    
    describe('settingDeckValueListener', function() {
      it('should exist', function() {
        expect(settingDeckValueListener).to.exist
      })

      it('should reset the error message', function() {
        store.dispatch(settingDeckValueListenerFailure('myDeckId', 'myErrorMessage'))
        store.dispatch(settingDeckValueListener('myDeckId'))

        const deck = store.getState().decks.getIn(['decks', 'myDeckId'])
        expect(deck.get('loadingError')).to.equal('')
      })
      
      it('should reset the snackbar', function() {
        store.dispatch(settingDeckValueListenerFailure('myDeckId', 'myErrorMessage'))
        store.dispatch(settingDeckValueListener('myDeckId'))

        const snackbar = store.getState().decks.get('snackbar')
        expect(snackbar.get('isActive')).to.be.false
        expect(snackbar.get('error')).to.equal('')
      })
    })
    
    describe('settingDeckValueListenerSuccess', function() {
      it('should exist', function() {
        expect(settingDeckValueListenerSuccess).to.exist
      })

      it('should load the retrieved data')
      it('should reset the snackbar')
    })
    
    describe('settingDeckValueListenerFailure', function() {
      it('should exist', function() {
        expect(settingDeckValueListenerFailure).to.exist
      })

      it('should log error in the deck itself')
      it('should show error in the snackbar')
    })
    
    describe('deletingDeck', function() {
      it('should exist', function() {
        expect(deletingDeck).to.exist
      })

      it('should set the isDeleting flag')
      it('should clear any previous error from the deck')
      it('should reset the snackbar')
    })
    
    describe('deletingDeckSuccess', function() {
      it('should exist', function() {
        expect(deletingDeckSuccess).to.exist
      })

      it('should not remove the deck from state')
      it('should not reset the isDeleting flag')
      it('should clear any previous error')
      it('should clear the snackbar')
    })
    
    describe('deletingDeckFailure', function() {
      it('should exist', function() {
        expect(deletingDeckFailure).to.exist
      })

      it('should log the error in the deck itself')
      it('should clear the isDeleting flag')
      it('should show the error in the snackbar')
    })
    
    describe('dismissDecksSnackbar', function() {
      it('should exist', function() {
        expect(dismissDecksSnackbar).to.exist
      })

      it('should hide the snackbar')
      it('should not clear the error message from the snackbar')
    })
    
    describe('updateDeck', function() {
      it('should exist', function() {
        expect(updateDeck).to.exist
      })

      it('should merge all new data into the deck')
      it('should retain all data not overwritten by new data')
    })
    
    describe('removeDeck', function() {
      it('should exist', function() {
        expect(removeDeck).to.exist
      })

      it('should remove the deck from state')
    })
    
    describe('decksLogout', function() {
      it('should exist', function() {
        expect(decksLogout).to.exist
      })

      it('should reset the state to the initial state')
    })
  })
})