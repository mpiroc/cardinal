import 'babel-polyfill'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import sinon from 'sinon'
import { signInWithPopup, signOut, setAuthStateChangedListener, saveUser } from 'helpers/firebase'

chai.use(sinonChai)

describe('firebase helpers', function() {
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
})
