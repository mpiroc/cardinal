import 'babel-polyfill'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import sinon from 'sinon'
import { updateDeck } from 'redux/modules/decks'
import { updateCard } from 'redux/modules/cards'
import reviewReducer from 'redux/modules/review'
import { setCurrentCard, toggleAnswerVisible } from 'redux/modules/review'
import createStoreMock from '../../testUtils/createStoreMock'

chai.use(sinonChai)

describe('redux review module', function() {
  let store

  beforeEach(function() {
    store = createStoreMock()
  })

  it('should exist', function() {
    expect(reviewReducer).to.exist
  })

  it('should initialize all properties', function() {
    const state = store.getState()
    expect(state.review.get('currentCardId')).to.exist
    expect(state.review.get('isAnswerVisible')).to.exist
  })

  describe('action creators', function() {
    describe('setCurrentCard', function() {
      it('should set currentCardId', function() {
        store.dispatch(setCurrentCard('myCardId'))
        const state = store.getState()

        expect(state.review.get('currentCardId')).to.equal('myCardId')
      })

      it('should set isAnswerVisible to false', function() {
        store.dispatch(toggleAnswerVisible())
        store.dispatch(setCurrentCard('myCardId'))
        const state = store.getState()

        expect(state.review.get('isAnswerVisible')).to.equal(false)
      })
    })

    describe('toggleAnswerVisible', function() {
      it ('should toggle isAnswerVisible', function() {
        expect(store.getState().review.get('isAnswerVisible')).to.equal(false)

        store.dispatch(toggleAnswerVisible())
        expect(store.getState().review.get('isAnswerVisible')).to.equal(true)

        store.dispatch(toggleAnswerVisible())
        expect(store.getState().review.get('isAnswerVisible')).to.equal(false)
      })
    })
  })

  describe('thunks', function() {
    describe('showNextCard', function() {
      it('should exist', function() {
        expect('showNextCard').to.exist
      })

      it('should not throw if deck does not exist', function() {
        expect(() => store.dispatch(showNextCard('myDeckId'))).to.not.throw
      })

      it('should not throw if deck has no cards', function() {
        store.dispatch(updateDeck('myDeckId', {
          deckId: 'myDeckId',
          name: 'myDeckName',
          cards: new Map(),
        }))

        expect(() => store.dispatch(showNextCard('myDeckId'))).to.not.throw
      })
      
      // TODO: Implement updateCardHistory on cards module. Remaining tests require this action creator.
      /*
      // TODO: For now we work around the randomness of showNextCard by only including one card in the deck.
      // In the future we should allow the random provider to be injected, and also test with multiple cards.
      it('should show card if deck has any cards', function() {
        store.dispatch(updateDeck('myDeckId', {
          deckId: 'myDeckId',
          name: 'myDeckName',
          cards: new Map({
            'myCardId': true
          }),
        }))
        store.dispatch(updateCard('myCardId', {
          cardId: 'myCardId',
          side1: 'mySide1',
          side2: 'mySide2',
        }))
      })
      */
    })
  })
})