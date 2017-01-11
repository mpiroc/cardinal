import 'babel-polyfill'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import sinon from 'sinon'
import moment from 'moment'
import { authUser } from 'redux/modules/auth'
import {

} from 'redux/modules/decks'
import createStoreMock from '../../testUtils/createStoreMock'

chai.use(sinonChai)

describe('redux decks module', function() {
  let store
  beforeEach(function() {
    store = createStoreMock()
  })
})