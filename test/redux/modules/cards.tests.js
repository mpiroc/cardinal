import 'babel-polyfill'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import sinon from 'sinon'
import moment from 'moment'
import { authUser } from 'redux/modules/auth'
import cardsReducer from 'redux/modules/cards'
import {
  settingCardValueListener,
  settingCardValueListenerSuccess,
  settingCardValueListenerFailure,
  deletingCard,
  deletingCardSuccess,
  deletingCardFailure,
  dismissCardsSnackbar,
  updateCard,
  removeCard,
  updateCardHistory,
  cardsLogout,
  deleteAndHandleCard,
  setCardValueListener,
} from 'redux/modules/cards'
import createStoreMock from '../../testUtils/createStoreMock'

chai.use(sinonChai)

describe('redux cards module', function() {
  let store

  beforeEach(function() {
    store = createStoreMock()
  })

  it('should exist', function() {
    expect(cardsReducer).to.exist
  })

  it('should initialize all properties', function() {
    const { cards } = store.getState()
    expect(cards).to.exist
    expect(cards.get('cards')).to.exist

    const snackbar = cards.get('snackbar')
    expect(snackbar).to.exist
    expect(snackbar.get('isActive')).to.be.false
    expect(snackbar.get('error')).to.equal('')
  })

  describe('action creators', function() {
    let card
    beforeEach(function() {
      store.dispatch(settingCardValueListener('myCardId'))

      card = store.getState().cards.getIn(['cards', 'myCardId'])
    })

    describe('settingCardValueListener', function() {
      it('should initialize empty card with specified id', function() {
        expect(card).to.exist
        expect(card.get('isDeleting')).to.be.false
        expect(card.get('loadingError')).to.equal('')
        expect(card.get('cardId')).to.equal('myCardId')
        expect(card.get('side1')).to.equal('')
        expect(card.get('side2')).to.equal('')
      })
    })

    describe('settingCardValueListenerSuccess', function() {
      let card
      beforeEach(function() {
        store.dispatch(settingCardValueListener('myCardId'))
        store.dispatch(settingCardValueListenerSuccess('myCardId', {
          cardId: 'myCardId',
          side1: 'mySideOne',
          side2: 'mySideTwo',
        }))

        card = store.getState().cards.getIn(['cards', 'myCardId'])
      })

      it('should initialize card with fetched values', function() {
        expect(card).to.exist
        expect(card.get('cardId')).to.equal('myCardId')
        expect(card.get('side1')).to.equal('mySideOne')
        expect(card.get('side2')).to.equal('mySideTwo')
      })
    })

    describe('settingCardValueListenerFailure', function() {
      let card
      beforeEach(function() {
        store.dispatch(settingCardValueListener('myCardId'))
        store.dispatch(settingCardValueListenerFailure('myCardId', 'myErrorMessage'))

        card = store.getState().cards.getIn(['cards', 'myCardId'])
      })

      it('should set the loading error message', function() {
        expect(card).to.exist
        expect(card.get('loadingError')).to.equal('myErrorMessage')
      })
    })

    describe('deletingCard', function() {
      let card
      beforeEach(function() {
        store.dispatch(settingCardValueListener('myCardId'))
        store.dispatch(settingCardValueListenerSuccess('myCardId', {
          cardId: 'myCardId',
          side1: 'mySideOne',
          side2: 'mySideTwo',
        }))
        store.dispatch(deletingCard('myCardId'))

        card = store.getState().cards.getIn(['cards', 'myCardId'])
      })

      it('should set the isDeleting flag', function() {
        expect(card).to.exist
        expect(card.get('isDeleting')).to.be.true
      })
    })

    describe('deletingCardSuccess', function() {
      let snackbar
      beforeEach(function() {
        store.dispatch(deletingCardFailure('myCardId', 'myErrorMessage'))
        store.dispatch(deletingCardSuccess('myCardId'))

        snackbar = store.getState().cards.get('snackbar')
      })

      it('should reset the snackbar', function() {
        expect(snackbar.get('isActive')).to.be.false
        expect(snackbar.get('error')).to.equal('')
      })
    })

    describe('deletingCardFailure', function() {
      beforeEach(function() {
        store.dispatch(deletingCardFailure('myCardId', 'myErrorMessage'))
      })

      it('should log the error in the card itself', function() {
        const card = store.getState().cards.getIn(['cards', 'myCardId'])

        expect(card.get('isDeleting')).to.be.false
        expect(card.get('deletingError')).to.equal('myErrorMessage')
      })

      it('should show the error in the snackbar', function() {
        const snackbar = store.getState().cards.get('snackbar')

        expect(snackbar.get('isActive')).to.be.true
        expect(snackbar.get('error')).to.equal('myErrorMessage')
      })
    })

    describe('dismissCardsSnackbar', function() {
      let snackbar
      beforeEach(function() {
        store.dispatch(deletingCardFailure('myCardId', 'myErrorMessage'))
        store.dispatch(dismissCardsSnackbar())

        snackbar = store.getState().cards.get('snackbar')
      })

      it('should hide the snackbar', function() {
        expect(snackbar.get('isActive')).to.be.false
      })

      it('should not reset the error message', function() {
        expect(snackbar.get('error')).to.equal('myErrorMessage')
      })
    })

    describe('updateCard', function() {
      let card
      beforeEach(function() {
        store.dispatch(settingCardValueListenerSuccess('myCardId', {
          cardId: 'myCardId',
          side1: 'mySideOne',
          side2: 'mySideTwo',
        }))
        store.dispatch(updateCard('myCardId', {
          side1: 'mySideOne2',
          side2: 'mySideTwo2',
        }))

        card = store.getState().cards.getIn(['cards', 'myCardId'])
      })

      it('should update any specified values', function() {
        expect(card.get('side1')).to.equal('mySideOne2')
        expect(card.get('side2')).to.equal('mySideTwo2')
      })

      it('should retain the old values for any unspecified fields', function() {
        expect(card.get('cardId')).to.equal('myCardId')
      })
    })

    describe('removeCard', function() {
      let card
      beforeEach(function() {
        store.dispatch(settingCardValueListenerSuccess('myCardId', {
          cardId: 'myCardId',
          side1: 'mySideOne',
          side2: 'mySideTwo',
        }))
        store.dispatch(removeCard('myCardId'))

        card = store.getState().cards.getIn(['cards', 'myCardId'])
      })

      it('should remove the card from collection of cards', function() {
        expect(card).to.not.exist
      })
    })

    describe('updateCardHistory', function() {
      beforeEach(function() {
        store.dispatch(updateCardHistory('myCardId', {
          grade: 4,
          difficulty: 3.5,
          repetitionCount : 3,
          previousReviewMoment: moment([2017, 0, 1, 0, 0, 0, 0]).valueOf(),
          nextReviewMoment: moment([2017, 0, 5, 0, 0, 0, 0]).valueOf(),
        }))
      })

      it("should set the specified values in the card's history", function() {
        const history = store.getState().cards.getIn(['cards', 'myCardId', 'history'])
        expect(history).to.exist
        expect(history.get('grade')).to.equal(4)
        expect(history.get('difficulty')).to.equal(3.5)
        expect(history.get('repetitionCount')).to.equal(3)
        expect(history.get('previousReviewMoment')).to.equal(moment([2017, 0, 1, 0, 0, 0, 0]).valueOf())
        expect(history.get('nextReviewMoment')).to.equal(moment([2017, 0, 5, 0, 0, 0, 0]).valueOf())
      })

      it('should retain old values not specified in new history', function() {
        store.dispatch(updateCardHistory('myCardId', {
          difficulty: 3.2,
        }))
        
        const history = store.getState().cards.getIn(['cards', 'myCardId', 'history'])
        expect(history).to.exist
        expect(history.get('grade')).to.equal(4)
        expect(history.get('difficulty')).to.equal(3.2)
      })
    })

    describe('cardsLogout', function() {
      let cards
      beforeEach(function() {
        store.dispatch(settingCardValueListenerSuccess('myCardId', {
          cardId: 'myCardId',
          side1: 'mySideOne',
          side2: 'mySideTwo',
        }))
        store.dispatch(cardsLogout())

        cards = store.getState().cards
      })

      it('should reset state to the initial state', function() {
        expect(cards.get('cards')).to.exist
        expect(cards.get('cards').size).to.equal(0)

        const snackbar = cards.get('snackbar')
        expect(snackbar).to.exist
        expect(snackbar.get('isActive')).to.be.false
        expect(snackbar.get('error')).to.equal('')
      })
    })
  })

  describe('thunks', function() {
    describe('deleteAndHandleCard', function() {
      let card
      beforeEach(function() {
        store.dispatch(authUser('myUid'))
        store.dispatch(settingCardValueListenerSuccess('myCardId', {
          cardId: 'myCardId',
          side1: 'mySideOne',
          side2: 'mySideTwo',
        }))
        store.dispatch(deleteAndHandleCard('myDeckId', 'myCardId'))

        card = store.getState().cards.getIn(['cards', 'myCardId'])
      })

      // It will be removed when the firebase listener receives a child_removed event.
      // If we ever decide to optimistically update, this test should be reversed.
      it('should not remove the card from state', function() {
        expect(card).to.exist
      })

      // Keep isDeleting true, so that the UI can continue to show progress until
      // we receive the child_removed event from firebase.
      it('should not reset isDeleting', function() {
        expect(card.get('isDeleting')).to.be.true
      })

      it('should reset deletingError', function() {
        expect(card.get('deletingError')).to.equal('')
      })
    })

    /*
    describe('setCardValueListener', function() {
      // TODO: Need a more complete mock of the firebase context to ensure that callbacks are triggered.
    })
    */
  })
})