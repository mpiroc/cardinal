import 'babel-polyfill'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { mount, render, shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import { Provider } from 'react-redux'
import CardRTCardContainer from '../../app/containers/CardRTCard/CardRTCardContainer'
import jsdomGlobal from 'jsdom-global'
import createStoreMock from '../testUtils/createStoreMock'

jsdomGlobal()
chai.use(chaiEnzyme())

describe('CardRTCard container', function() {
  let wrapper
  beforeEach(function() {
    const store = createStoreMock()
    wrapper = mount(
      <Provider store={store}>
        <CardRTCardContainer deckId={'myDeckId'} cardId={'myCardId'} />
      </Provider>
    )
  })

  it('exists', function() {
    expect(wrapper).to.exist
  })
})