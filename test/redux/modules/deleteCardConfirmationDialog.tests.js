import 'babel-polyfill'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import sinon from 'sinon'
import { authUser } from 'redux/modules/auth'
import { updateCard } from 'redux/modules/cards'
import deleteCardConfirmationDialogReducer, {
  openDeleteCardConfirmationDialog,
  closeDeleteCardConfirmationDialog,
  closeDialogAndDeleteCard,
} from 'redux/modules/deleteCardConfirmationDialog'
import createStoreMock from '../../testUtils/createStoreMock'

chai.use(sinonChai)

describe('deleteCardConfirmationDialog', function() {
  let store

  beforeEach(function() {
    store = createStoreMock()

    store.dispatch(authUser('myUid'))
  })

  it('should exist', function() {
    expect(deleteCardConfirmationDialogReducer).to.exist
  })

  it('should initialize all properties', function() {
    const { deleteCardConfirmationDialog } = store.getState()
    expect(deleteCardConfirmationDialog).to.exist
    expect(deleteCardConfirmationDialog.get('isActive')).to.be.false
    expect(deleteCardConfirmationDialog.get('deckId')).to.equal('')
    expect(deleteCardConfirmationDialog.get('cardId')).to.equal('')
  })

  describe('thunk', function() {
    describe('closeDialogAndDeleteCard', function() {
      it('should exist', function() {
        expect(closeDialogAndDeleteCard).to.exist
      })

      it('should close the dialog', function() {
        store.dispatch(openDeleteCardConfirmationDialog('myDeckId', 'myCardId'))
        store.dispatch(closeDialogAndDeleteCard())

        const { deleteCardConfirmationDialog } = store.getState()
        expect(deleteCardConfirmationDialog.get('isActive')).to.be.false
      })

      it('should delete the correct card', function() {
        store.dispatch(openDeleteCardConfirmationDialog('myDeckId', 'myCardId'))
        store.dispatch(closeDialogAndDeleteCard())

        expect(store.firebaseContext.stubs.child).to.have.been.calledTwice
        expect(store.firebaseContext.stubs.child).to.have.been.calledWith('deckCards/myUid/myDeckId/myCardId')
        expect(store.firebaseContext.stubs.child).to.have.been.calledWith('cardHistory/myUid/myDeckId/myCardId')
        expect(store.firebaseContext.stubs.remove).to.have.been.calledTwice
      })
    })
  })

  describe('action creator', function() {
    describe('openDeleteCardConfirmationDialog', function() {
      it('should exist', function() {
        expect(openDeleteCardConfirmationDialog).to.exist
      })

      it('should set all properties', function() {
        store.dispatch(openDeleteCardConfirmationDialog('myDeckId', 'myCardId'))

        const { deleteCardConfirmationDialog } = store.getState()
        expect(deleteCardConfirmationDialog.get('isActive')).to.be.true
        expect(deleteCardConfirmationDialog.get('deckId')).to.equal('myDeckId')
        expect(deleteCardConfirmationDialog.get('cardId')).to.equal('myCardId')
      })
    })

    describe('closeDeleteCardConfirmationDialog', function() {
      it('should exist', function() {
        expect(closeDeleteCardConfirmationDialog).to.exist
      })

      it('should reset all properties', function() {
        store.dispatch(openDeleteCardConfirmationDialog('myDeckId', 'myCardId'))
        store.dispatch(closeDeleteCardConfirmationDialog())

        const { deleteCardConfirmationDialog } = store.getState()
        expect(deleteCardConfirmationDialog.get('isActive')).to.be.false
        expect(deleteCardConfirmationDialog.get('deckId')).to.equal('')
        expect(deleteCardConfirmationDialog.get('cardId')).to.equal('')
      })
    })
  })
})