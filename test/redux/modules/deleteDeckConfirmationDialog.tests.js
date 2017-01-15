import 'babel-polyfill'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import sinon from 'sinon'
import { authUser } from 'redux/modules/auth'
import { updateDeck } from 'redux/modules/decks'
import deleteDeckConfirmationDialogReducer, {
  openDeleteDeckConfirmationDialog,
  closeDeleteDeckConfirmationDialog,
  closeDialogAndDeleteDeck,
} from 'redux/modules/deleteDeckConfirmationDialog'
import createStoreMock from '../../testUtils/createStoreMock'

chai.use(sinonChai)

describe('deleteDeckConfirmationDialog', function() {
  let store

  beforeEach(function() {
    store = createStoreMock()

    store.dispatch(authUser('myUid'))
  })

  it('should exist', function() {
    expect(deleteDeckConfirmationDialogReducer).to.exist
  })

  it('should initialize all properties', function() {
    const { deleteDeckConfirmationDialog } = store.getState()
    expect(deleteDeckConfirmationDialog).to.exist
    expect(deleteDeckConfirmationDialog.get('isActive')).to.be.false
    expect(deleteDeckConfirmationDialog.get('deckId')).to.equal('')
    expect(deleteDeckConfirmationDialog.get('name')).to.equal('')
    expect(deleteDeckConfirmationDialog.get('cardCount')).to.not.exist
  })

  describe('thunk', function() {
    describe('closeDialogAndDeleteDeck', function() {
      it('should exist', function() {
        expect(closeDialogAndDeleteDeck).to.exist
      })

      it('should close the dialog', function() {
        store.dispatch(openDeleteDeckConfirmationDialog('myDeckId', 'myDeckName', 2))
        store.dispatch(closeDialogAndDeleteDeck())

        const { deleteDeckConfirmationDialog } = store.getState()
        expect(deleteDeckConfirmationDialog.get('isActive')).to.be.false
      })

      it('should delete the correct deck', function() {
        store.dispatch(openDeleteDeckConfirmationDialog('myDeckId', 'myDeckName', 2))
        store.dispatch(closeDialogAndDeleteDeck())

        expect(store.firebaseContext.stubs.child).to.have.been.calledThrice
        expect(store.firebaseContext.stubs.child).to.have.been.calledWith('userDecks/myUid/myDeckId')
        expect(store.firebaseContext.stubs.child).to.have.been.calledWith('deckCards/myUid/myDeckId')
        expect(store.firebaseContext.stubs.child).to.have.been.calledWith('cardHistory/myUid/myDeckId')
        expect(store.firebaseContext.stubs.remove).to.have.been.calledThrice
      })
    })
  })

  describe('action creator', function() {
    describe('openDeleteDeckConfirmationDialog', function() {
      it('should exist', function() {
        expect(openDeleteDeckConfirmationDialog).to.exist
      })

      it('should set all properties', function() {
        store.dispatch(openDeleteDeckConfirmationDialog('myDeckId', 'myDeckName', 2))

        const { deleteDeckConfirmationDialog } = store.getState()
        expect(deleteDeckConfirmationDialog.get('isActive')).to.be.true
        expect(deleteDeckConfirmationDialog.get('deckId')).to.equal('myDeckId')
        expect(deleteDeckConfirmationDialog.get('name')).to.equal('myDeckName')
        expect(deleteDeckConfirmationDialog.get('cardCount')).to.equal(2)
      })
    })

    describe('closeDeleteDeckConfirmationDialog', function() {
      it('should exist', function() {
        expect(closeDeleteDeckConfirmationDialog).to.exist
      })

      it('should only reset non-visible properties', function() {
        store.dispatch(openDeleteDeckConfirmationDialog('myDeckId', 'myDeckName', 2))
        store.dispatch(closeDeleteDeckConfirmationDialog())

        const { deleteDeckConfirmationDialog } = store.getState()
        expect(deleteDeckConfirmationDialog.get('isActive')).to.be.false
        expect(deleteDeckConfirmationDialog.get('deckId')).to.equal('')
        expect(deleteDeckConfirmationDialog.get('name')).to.equal('myDeckName')
        expect(deleteDeckConfirmationDialog.get('cardCount')).to.equal(2)
      })
    })
  })
})