import 'babel-polyfill'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import sinon from 'sinon'
import { signInWithPopup } from 'helpers/firebase'

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

    it('exists', function() {
      expect(signInWithPopup).to.exist
    })

    it('uses the google auth provider', async function() {
      await signInWithPopup({ auth: authStub })

      expect(authStub.GoogleAuthProvider).to.have.been.calledOnce
    })

    it('signs in using firebase', async function() {
      await signInWithPopup({ auth: authStub })

      expect(signInWithPopupStub).to.have.been.calledOnce
    })

    it("returns the user's uid and name", async function() {
      const result = await signInWithPopup({ auth: authStub })

      expect(result.uid).to.equal('myUid')
      expect(result.name).to.equal('myDisplayName')
    })
  })
})