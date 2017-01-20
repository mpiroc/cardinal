import 'babel-polyfill'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import sinon from 'sinon'
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
  fetchingDeckHistory,
  fetchingDeckHistorySuccess,
  fetchingDeckHistoryFailure,
  fetchAndHandleDeckHistory,
  deleteAndHandleDeck,
  setDeckValueListener,
  setDeckCardCollectionListeners,
} from 'redux/modules/decks'
import createStoreMock from '../../testUtils/createStoreMock'

chai.use(sinonChai)

describe('decks', function() {
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
    expect(decks.get('decks').size).to.equal(0)

    const snackbar = decks.get('snackbar')
    expect(snackbar).to.exist
    expect(snackbar.get('isActive')).to.be.false
    expect(snackbar.get('error')).to.equal('')
  })

  describe('action creator', function() {
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

      it("should remove cardId from deck's cards", function() {
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
      
      it('should not reset the snackbar', function() {
        store.dispatch(settingDeckValueListenerFailure('myDeckId', 'myErrorMessage'))
        store.dispatch(settingDeckValueListener('myDeckId'))

        const snackbar = store.getState().decks.get('snackbar')
        expect(snackbar.get('isActive')).to.be.true
        expect(snackbar.get('error')).to.equal('myErrorMessage')
      })
    })
    
    describe('settingDeckValueListenerSuccess', function() {
      it('should exist', function() {
        expect(settingDeckValueListenerSuccess).to.exist
      })

      it('should load the retrieved data', function() {
        store.dispatch(settingDeckValueListenerSuccess('myDeckId', {
          deckId: 'myDeckId',
          name: 'myDeckName',
        }))

        const deck = store.getState().decks.getIn(['decks', 'myDeckId'])
        expect(deck.get('deckId')).to.equal('myDeckId')
        expect(deck.get('name')).to.equal('myDeckName')
      })

      it('should set appropriate defaults', function() {
        store.dispatch(settingDeckValueListenerSuccess('myDeckId', {}))

        const deck = store.getState().decks.getIn(['decks', 'myDeckId'])
        expect(deck.get('isFetchingHistory')).to.be.false
        expect(deck.get('isDeleting')).to.be.false
        expect(deck.get('loadingError')).to.equal('')
        expect(deck.get('addOrRemoveError')).to.equal('')
        expect(deck.get('deletingError')).to.equal('')
        expect(deck.get('fetchingHistoryError')).to.equal('')
        expect(deck.get('deckId')).to.equal('')
        expect(deck.get('name')).to.equal('')
        expect(deck.get('cards')).to.exist
        expect(deck.get('cards').size).to.equal(0)
      })

      it('should not reset the snackbar', function() {
        store.dispatch(settingDeckValueListenerFailure('myDeckId', 'myErrorMessage'))
        store.dispatch(settingDeckValueListenerSuccess('myDeckId', {
          deckId: 'myDeckId',
          name: 'myDeckName',
        }))

        const snackbar = store.getState().decks.get('snackbar')
        expect(snackbar.get('isActive')).to.be.true
        expect(snackbar.get('error')).to.equal('myErrorMessage')
      })
    })
    
    describe('settingDeckValueListenerFailure', function() {
      it('should exist', function() {
        expect(settingDeckValueListenerFailure).to.exist
      })

      it('should log error in the deck itself', function() {
        store.dispatch(settingDeckValueListenerFailure('myDeckId', 'myErrorMessage'))

        const deck = store.getState().decks.getIn(['decks', 'myDeckId'])
        expect(deck.get('loadingError')).to.equal('myErrorMessage')
      })

      it('should show error in the snackbar', function() {
        store.dispatch(settingDeckValueListenerFailure('myDeckId', 'myErrorMessage'))

        const snackbar = store.getState().decks.get('snackbar')
        expect(snackbar.get('isActive')).to.be.true
        expect(snackbar.get('error')).to.equal('myErrorMessage')
      })
    })
    
    describe('deletingDeck', function() {
      it('should exist', function() {
        expect(deletingDeck).to.exist
      })

      it('should set the isDeleting flag', function() {
        store.dispatch(deletingDeck('myDeckId'))

        const deck = store.getState().decks.getIn(['decks', 'myDeckId'])
        expect(deck.get('isDeleting')).to.be.true
      })

      it('should not reset the snackbar', function() {
        store.dispatch(settingDeckValueListenerFailure('myDeckId', 'myErrorMessage'))
        store.dispatch(deletingDeck('myDeckId'))

        const snackbar = store.getState().decks.get('snackbar')
        expect(snackbar.get('isActive')).to.be.true
        expect(snackbar.get('error')).to.equal('myErrorMessage')
      })
    })
    
    describe('deletingDeckSuccess', function() {
      it('should exist', function() {
        expect(deletingDeckSuccess).to.exist
      })

      it('should not remove the deck from state', function() {
        store.dispatch(updateDeck('myDeckId', {
          deckId: 'myDeckId',
          name: 'myDeckName',
        }))
        store.dispatch(deletingDeckSuccess('myDeckId'))

        const deck = store.getState().decks.getIn(['decks', 'myDeckId'])
        expect(deck).to.exist
      })

      it('should not reset the isDeleting flag', function() {
        store.dispatch(updateDeck('myDeckId', {
          deckId: 'myDeckId',
          name: 'myDeckName',
        }))
        store.dispatch(deletingDeck('myDeckId'))
        store.dispatch(deletingDeckSuccess('myDeckId'))

        const deck = store.getState().decks.getIn(['decks', 'myDeckId'])
        expect(deck.get('isDeleting')).to.be.true
      })
      
      it('should not reset the snackbar', function() {
        store.dispatch(deletingDeckFailure('myDeckId', 'myErrorMessage'))
        store.dispatch(deletingDeckSuccess('myDeckId'))

        const snackbar = store.getState().decks.get('snackbar')
        expect(snackbar.get('isActive')).to.be.true
        expect(snackbar.get('error')).to.equal('myErrorMessage')
      })
    })
    
    describe('deletingDeckFailure', function() {
      it('should exist', function() {
        expect(deletingDeckFailure).to.exist
      })

      it('should log the error in the deck itself', function() {
        store.dispatch(deletingDeckFailure('myDeckId', 'myErrorMessage'))

        const deck = store.getState().decks.getIn(['decks', 'myDeckId'])
        expect(deck.get('deletingError')).to.equal('myErrorMessage')
      })
      
      it('should clear the isDeleting flag', function() {
        store.dispatch(deletingDeck('myDeckId'))
        store.dispatch(deletingDeckFailure('myDeckId', 'myErrorMessage'))

        const deck = store.getState().decks.getIn(['decks', 'myDeckId'])
        expect(deck.get('isDeleting')).to.be.false
      })
      
      it('should show the error in the snackbar', function() {
        store.dispatch(deletingDeckFailure('myDeckId', 'myErrorMessage'))

        const snackbar = store.getState().decks.get('snackbar')
        expect(snackbar.get('isActive')).to.be.true
        expect(snackbar.get('error')).to.equal('myErrorMessage')
      })
    })
    
    describe('dismissDecksSnackbar', function() {
      it('should exist', function() {
        expect(dismissDecksSnackbar).to.exist
      })

      it('should hide the snackbar', function() {
        store.dispatch(deletingDeckFailure('myDeckId', 'myErrorMessage'))
        store.dispatch(dismissDecksSnackbar())

        const snackbar = store.getState().decks.get('snackbar')
        expect(snackbar.get('isActive')).to.be.false
      })

      it('should clear the error message from the snackbar', function() {
        store.dispatch(deletingDeckFailure('myDeckId', 'myErrorMessage'))
        store.dispatch(dismissDecksSnackbar())

        const snackbar = store.getState().decks.get('snackbar')
        expect(snackbar.get('error')).to.equal('')
      })
    })
    
    describe('updateDeck', function() {
      it('should exist', function() {
        expect(updateDeck).to.exist
      })

      it('should merge all new data into the deck', function() {
        store.dispatch(updateDeck('myDeckId', {
          deckId: 'myDeckId',
          name: 'myDeckName'
        }))

        const deck = store.getState().decks.getIn(['decks', 'myDeckId'])
        expect(deck.get('deckId')).to.equal('myDeckId')
        expect(deck.get('name')).to.equal('myDeckName')
      })

      it('should retain all data not overwritten by new data', function() {
        store.dispatch(updateDeck('myDeckId', {
          isDeleting: true,
          error: 'myErrorMessage'
        }))
        store.dispatch(updateDeck('myDeckId', {
          deckId: 'myDeckId',
          name: 'myDeckName'
        }))

        const deck = store.getState().decks.getIn(['decks', 'myDeckId'])
        expect(deck.get('isDeleting')).to.be.true
        expect(deck.get('error')).to.equal('myErrorMessage')
      })
    })
    
    describe('removeDeck', function() {
      it('should exist', function() {
        expect(removeDeck).to.exist
      })

      it('should remove the deck from state', function() {
        store.dispatch(updateDeck('myDeckId', {
          deckId: 'myDeckId',
          name: 'myDeckName'
        }))
        store.dispatch(removeDeck('myDeckId'))

        const deck = store.getState().decks.getIn(['decks', 'myDeckId'])
        expect(deck).to.not.exist
      })
    })
    
    describe('decksLogout', function() {
      it('should exist', function() {
        expect(decksLogout).to.exist
      })

      it('should reset the state to the initial state', function() {
        store.dispatch(updateDeck('myDeckId', {
          deckId: 'myDeckId',
          name: 'myDeckName'
        }))
        store.dispatch(deletingDeckFailure('myDeckId', 'myErrorMessage'))
        store.dispatch(decksLogout())

        const { decks } = store.getState()
        expect(decks.get('decks')).to.exist
        expect(decks.get('decks').size).to.equal(0)

        const snackbar = decks.get('snackbar')
        expect(snackbar).to.exist
        expect(snackbar.get('isActive')).to.be.false
        expect(snackbar.get('error')).to.equal('')
      })
    })

    describe('fetchingDeckHistory', function() {
      it('should exist', function() {
        expect(fetchingDeckHistory).to.exist
      })

      it('should set the isFetchingHistory flag', function() {
        store.dispatch(fetchingDeckHistory('myDeckId'))

        const deck = store.getState().decks.getIn(['decks', 'myDeckId'])
        expect(deck.get('isFetchingHistory')).to.be.true
      })
    })

    describe('fetchingDeckHistorySuccess', function() {
      it('should exist', function() {
        expect(fetchingDeckHistorySuccess).to.exist
      })

      it('should clear the isFetchingHistory flag', function() {
        store.dispatch(fetchingDeckHistory('myDeckId'))
        store.dispatch(fetchingDeckHistorySuccess('myDeckId'))

        const deck = store.getState().decks.getIn(['decks', 'myDeckId'])
        expect(deck.get('isFetchingHistory')).to.be.false
      })

      it('should clear any previous fetchingHistory error message', function() {
        store.dispatch(fetchingDeckHistoryFailure('myDeckId', 'myErrorMessage'))
        store.dispatch(fetchingDeckHistorySuccess('myDeckId'))

        const deck = store.getState().decks.getIn(['decks', 'myDeckId'])
        expect(deck.get('fetchingHistoryError')).to.equal('')
      })

      it('should not reset the snackbar', function() {
        store.dispatch(fetchingDeckHistoryFailure('myDeckId', 'myErrorMessage'))
        store.dispatch(fetchingDeckHistorySuccess('myDeckId'))

        const snackbar = store.getState().decks.get('snackbar')
        expect(snackbar.get('isActive')).to.be.true
        expect(snackbar.get('error')).to.equal('myErrorMessage')
      })
    })

    describe('fetchingDeckHistoryFailure', function() {
      it('should exist', function() {
        expect(fetchingDeckHistoryFailure).to.exist
      })

      it('should clear the isFetchingHistory flag', function() {
        store.dispatch(fetchingDeckHistory('myDeckId'))
        store.dispatch(fetchingDeckHistoryFailure('myDeckId', 'myErrorMessage'))

        const deck = store.getState().decks.getIn(['decks', 'myDeckId'])
        expect(deck.get('isFetchingHistory')).to.be.false
      })

      it('should log any error in the deck itself', function() {
        store.dispatch(fetchingDeckHistoryFailure('myDeckId', 'myErrorMessage'))

        const deck = store.getState().decks.getIn(['decks', 'myDeckId'])
        expect(deck.get('fetchingHistoryError')).to.equal('myErrorMessage')
      })

      it('should show any error in the snackbar', function() {
        store.dispatch(fetchingDeckHistoryFailure('myDeckId', 'myErrorMessage'))

        const snackbar = store.getState().decks.get('snackbar')
        expect(snackbar.get('isActive')).to.be.true
        expect(snackbar.get('error')).to.equal('myErrorMessage')
      })
    })
  })

  describe('thunk', function() {
    describe('fetchAndHandleDeckHistory', function() {
      it('should exist', function() {
        expect(fetchAndHandleDeckHistory).to.exist
      })

      it('should set the isFetching flag on the deck')

      it('should add the history to the cards module when a value event is received')

      it('should log and display an error message if an error occurs')
    })

    describe('deleteAndHandleDeck', function() {
      it('should exist', function() {
        expect(deleteAndHandleDeck).to.exist
      })

      it('should not remove the deck from state')

      it('should not reset isDeleting')

      it('should not reset deletingError')
    })
  })
})