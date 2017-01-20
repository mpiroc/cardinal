import 'babel-polyfill'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import sinon from 'sinon'
import moment from 'moment'
import {
  signInWithPopup,
  signOut,
  setAuthStateChangedListener,
  saveUser,
  deleteDeck,
  saveNewDeck,
  saveExistingDeck,
  deleteCard,
  saveNewCard,
  saveExistingCard,
  saveCardHistory,
  fetchDeckHistory,
} from 'helpers/firebase'

chai.use(sinonChai)

describe('firebase helper', function() {
  describe('signInWithPopup', function() {
    let signInWithPopupStub
    let authStub

    beforeEach(function() {
      signInWithPopupStub = sinon.stub().returns(Promise.resolve({
        user: {
          uid: 'myUid',
          displayName: 'myDisplayName',
        }
      }))
      authStub = sinon.stub().returns({
        signInWithPopup: signInWithPopupStub,
      })
      authStub.GoogleAuthProvider = sinon.stub().returns({})
    })

    it('should exist', function() {
      expect(signInWithPopup).to.exist
    })

    it('should use the google auth provider', async function() {
      await signInWithPopup({ auth: authStub })

      expect(authStub.GoogleAuthProvider).to.have.been.calledOnce
    })

    it('should sign in using firebase', async function() {
      await signInWithPopup({ auth: authStub })

      expect(signInWithPopupStub).to.have.been.calledOnce
    })

    it("should return the user's uid and name", async function() {
      const result = await signInWithPopup({ auth: authStub })

      expect(result.uid).to.equal('myUid')
      expect(result.name).to.equal('myDisplayName')
    })
  })

  describe('signOut', function() {
    it('should exist', function() {
      expect(signOut).to.exist
    })

    it("should call firebase's logout function", function() {
      const signOutStub = sinon.stub()
      const authStub = sinon.stub().returns({
        signOut: signOutStub
      })

      signOut({ auth: authStub })

      expect(signOutStub).to.have.been.calledOnce
    })
  })

  describe('setAuthStateChangedListener', function() {
    it('should exist', function() {
      expect(setAuthStateChangedListener).to.exist
    })

    it('should register argument as listener', function() {
      const onAuthStateChangedStub = sinon.stub()
      const authStub = sinon.stub().returns({
        onAuthStateChanged: onAuthStateChangedStub
      })

      const fbOnAuthStateChanged = () => undefined
      setAuthStateChangedListener({ auth: authStub}, fbOnAuthStateChanged)
      expect(onAuthStateChangedStub).to.have.been.calledWith(fbOnAuthStateChanged)
    })
  })

  describe('saveUser', function() {
    let setStub
    let childStub
    let refMock

    beforeEach(function() {
      setStub = sinon.stub()
      childStub = sinon.stub().returns({
        set: setStub
      })
      refMock = {
        child: childStub
      }
    })

    it('should exist', function() {
      expect(saveUser).to.exist
    })

    it('should save user to correct path', async function() {
      await saveUser({ ref: refMock }, { uid: 'myUid', name: 'myDisplayName' })

      expect(childStub).to.have.been.calledOnce
      expect(childStub).to.have.been.calledWith('users/myUid')
    })

    it('should save correct user data', async function() {
      await saveUser({ ref: refMock }, { uid: 'myUid', name: 'myDisplayName' })

      expect(setStub).to.have.been.calledOnce
      expect(setStub).to.have.been.calledWith(sinon.match({
        uid: 'myUid',
        name: 'myDisplayName',
      }))
    })
  })

  describe('deleteDeck', function() {
    let refMock
    let childStub
    let removeStub

    beforeEach(function() {
      removeStub = sinon.stub()
      childStub = sinon.stub().returns({
        remove: removeStub
      })
      refMock = {
        child: childStub
      }
    })

    it('should exist', function() {
      expect(deleteDeck).to.exist
    })

    it('should delete the correct records', function() {
      deleteDeck({ ref: refMock }, 'myUid', 'myDeckId')

      expect(childStub).to.have.been.calledThrice
      expect(childStub).to.have.been.calledWith('deckCards/myUid/myDeckId')
      expect(childStub).to.have.been.calledWith('cardHistory/myUid/myDeckId')
      expect(childStub).to.have.been.calledWith('userDecks/myUid/myDeckId')
      expect(removeStub).to.have.been.calledThrice
    })
  })

  describe('saveNewDeck', function() {
    let setStub
    let pushStub
    let childStub
    let refMock

    beforeEach(function() {
      setStub = sinon.stub()
      pushStub = sinon.stub().returns({
        key: 'myNewDeckId',
        set: setStub,
      })
      childStub = sinon.stub().returns({
        push: pushStub
      })
      refMock = {
        child: childStub
      }
    })

    it('should exist', function() {
      expect(saveNewDeck).to.exist
    })

    it('should save to correct user', function() {
      saveNewDeck({ ref: refMock }, 'myUid', { name: 'myDeckName', description: 'myDeckDescription' })

      expect(childStub).to.have.been.calledOnce
      expect(childStub).to.have.been.calledWith('userDecks/myUid')
    })

    it('should generate new deck id', function() {
      saveNewDeck({ ref: refMock }, 'myUid', { name: 'myDeckName', description: 'myDeckDescription' })

      expect(pushStub).to.have.been.calledOnce
    })

    it('should save correct data', function() {
      saveNewDeck({ ref: refMock }, 'myUid', { name: 'myDeckName', description: 'myDeckDescription' })

      expect(setStub).to.have.been.calledOnce
      expect(setStub).to.have.been.calledWith(sinon.match({
        deckId: 'myNewDeckId',
        name: 'myDeckName',
        description: 'myDeckDescription'
      }))
    })
  })

  describe('saveExistingDeck', function() {
    let refMock
    let childStub
    let setStub

    beforeEach(function() {
      setStub = sinon.stub()
      childStub = sinon.stub().returns({
        set: setStub
      })
      refMock = {
        child: childStub
      }
    })

    it('should exist', function() {
      expect(saveExistingDeck).to.exist
    })

    it('should save to correct path', function() {
      saveExistingDeck({ ref: refMock }, 'myUid', {
        deckId: 'myDeckId',
        name: 'myDeckName',
        description: 'myDeckDescription',
      })

      expect(childStub).to.have.been.calledOnce
      expect(childStub).to.have.been.calledWith('userDecks/myUid/myDeckId')
    })

    it('should save correct data', function() {
      saveExistingDeck({ ref: refMock }, 'myUid', {
        deckId: 'myDeckId',
        name: 'myDeckName',
        description: 'myDeckDescription',
      })

      expect(setStub).to.have.been.calledOnce
      expect(setStub).to.have.been.calledWith(sinon.match({
        deckId: 'myDeckId',
        name: 'myDeckName',
        description: 'myDeckDescription',
      }))
    })
  })

  describe('deleteCard', function() {
    let refMock
    let childStub
    let removeDeckCardStub
    let removeCardHistoryStub

    beforeEach(function() {
      removeDeckCardStub = sinon.stub()
      removeCardHistoryStub = sinon.stub()
      
      childStub = sinon.stub()
      childStub
        .withArgs('deckCards/myUid/myDeckId/myCardId').returns({
          remove: removeDeckCardStub
        })
        .withArgs('cardHistory/myUid/myDeckId/myCardId').returns({
          remove: removeCardHistoryStub
        })

      refMock = {
        child: childStub
      }
    })

    it('should exist', function() {
      expect(deleteCard).to.exist
    })

    it('should delete correct path', function() {
      deleteCard({ ref: refMock }, 'myUid', 'myDeckId', 'myCardId')

      expect(childStub.withArgs('deckCards/myUid/myDeckId/myCardId')).to.have.been.calledOnce
      expect(childStub.withArgs('cardHistory/myUid/myDeckId/myCardId')).to.have.been.calledOnce
      expect(removeDeckCardStub).to.have.been.calledOnce
      expect(removeCardHistoryStub).to.have.been.calledOnce
    })
  })

  describe('saveNewCard', function() {
    let refMock
    let childStub
    let pushStub
    let deckCardSetStub
    let cardHistorySetStub

    beforeEach(function() {
      deckCardSetStub = sinon.stub()
      cardHistorySetStub = sinon.stub()
      pushStub = sinon.stub().returns({
        key: 'myNewCardId',
        set: deckCardSetStub,
      })
      childStub = sinon.stub()
      childStub.withArgs('deckCards/myUid/myDeckId').returns({
          push: pushStub,
          set: deckCardSetStub,
        })
      childStub.withArgs('cardHistory/myUid/myDeckId/myNewCardId').returns({
        set: cardHistorySetStub,
      })
      refMock = {
        child: childStub
      }
    })

    it('should exist', function() {
      expect(saveNewCard).to.exist
    })

    it('should save to correct paths', function() {
      saveNewCard({ ref: refMock }, 'myUid', 'myDeckId', {
        side1: 'mySide1',
        side2: 'mySide2',
      })

      expect(childStub.withArgs('deckCards/myUid/myDeckId')).to.have.been.calledOnce
      expect(childStub.withArgs('cardHistory/myUid/myDeckId/myNewCardId')).to.have.been.calledOnce
    })

    it('should generate new cardId', function() {
      saveNewCard({ ref: refMock }, 'myUid', 'myDeckId', {
        side1: 'mySide1',
        side2: 'mySide2',
      })

      expect(pushStub).to.have.been.calledOnce
    })

    it('should save correct data', function() {
      saveNewCard({ ref: refMock }, 'myUid', 'myDeckId', {
        side1: 'mySide1',
        side2: 'mySide2',
      })

      expect(deckCardSetStub).to.have.been.calledOnce
      expect(deckCardSetStub).to.have.been.calledWith(sinon.match({
        cardId: 'myNewCardId',
        side1: 'mySide1',
        side2: 'mySide2'
      }))

      expect(cardHistorySetStub).to.have.been.calledOnce
      expect(cardHistorySetStub).to.have.been.calledWith(sinon.match({
        grade: 0,
        difficulty: 2.5,
        repetitionCount: 0,
      }))
    })
  })

  describe('saveExistingCard', function() {
    let refMock
    let childStub
    let setStub

    beforeEach(function() {
      setStub = sinon.stub()
      childStub = sinon.stub().returns({
        set: setStub
      })
      refMock = {
        child: childStub
      }
    })

    it('should exist', function() {
      expect(saveExistingCard).to.exist
    })

    it('should save to correct path', function() {
      saveExistingCard({ ref: refMock }, 'myUid', 'myDeckId', {
        cardId: 'myCardId',
        side1: 'mySide1',
        side2: 'mySide2',
      })

      expect(childStub).to.have.been.calledOnce
      expect(childStub).to.have.been.calledWith('deckCards/myUid/myDeckId/myCardId')
    })

    it('should save correct data', function() {
      saveExistingCard({ ref: refMock }, 'myUid', 'myDeckId', {
        cardId: 'myCardId',
        side1: 'mySide1',
        side2: 'mySide2',
      })

      expect(setStub).to.have.been.calledOnce
      expect(setStub).to.have.been.calledWith(sinon.match({
        cardId: 'myCardId',
        side1: 'mySide1',
        side2: 'mySide2',
      }))
    })
  })

  describe('saveCardHistory', function() {
    let refMock
    let childStub
    let setStub
    let previousReviewMs
    let nextReviewMs

    beforeEach(function() {
      setStub = sinon.stub()
      childStub = sinon.stub().returns({
        set: setStub
      })
      refMock = {
        child: childStub
      }
      previousReviewMs = moment([2017, 0, 5, 0, 0, 0, 0]).valueOf()
      nextReviewMs = moment([2017, 0, 8, 0, 0, 0, 0]).valueOf()
    })

    it('exists', function() {
      expect(saveCardHistory).to.exist
    })

    it('saves to correct path', function() {
      saveCardHistory({ ref: refMock }, 'myUid', 'myDeckId', 'myCardId', {
        grade: 3,
        difficulty: 2.2,
        repetitionCount: 3,
        previousReviewMs,
        nextReviewMs,
      })

      expect(childStub).to.have.been.calledOnce
      expect(childStub).to.have.been.calledWith('cardHistory/myUid/myDeckId/myCardId')
    })

    it('saves correct data', function() {
      saveCardHistory({ ref: refMock }, 'myUid', 'myDeckId', 'myCardId', {
        grade: 3,
        difficulty: 2.2,
        repetitionCount: 3,
        previousReviewMs,
        nextReviewMs,
      })

      expect(setStub).to.have.been.calledOnce
      expect(setStub).to.have.been.calledWith({
        grade: 3,
        difficulty: 2.2,
        repetitionCount: 3,
        previousReviewMs,
        nextReviewMs,
      })
    })
  })

  describe('fetchDeckHistory', function() {
    it('should exist', function() {
      expect(fetchDeckHistory).to.exist
    })

    it('listens on correct path', function() {
      const onceStub = sinon.stub()
      const childStub = sinon.stub().returns({
        once: onceStub
      })
      const refMock = {
        child: childStub
      }

      fetchDeckHistory({ ref: refMock }, 'myUid', 'myDeckId')
      expect(childStub).to.have.been.calledOnce
      expect(childStub).to.have.been.calledWith('cardHistory/myUid/myDeckId')
    })

    it('listens for correct event', function() {
      const onceStub = sinon.stub()
      const childStub = sinon.stub().returns({
        once: onceStub
      })
      const refMock = {
        child: childStub
      }

      fetchDeckHistory({ ref: refMock }, 'myUid', 'myDeckId')
      expect(onceStub).to.have.been.calledOnce
      expect(onceStub).to.have.been.calledWith('value')
    })
  })
})
