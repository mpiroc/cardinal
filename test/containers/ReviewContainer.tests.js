import 'babel-polyfill'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { mount, render, shallow } from 'enzyme'
import React from 'react'
import { Provider } from 'react-redux'
import jsdomGlobal from 'jsdom-global'
import createStoreMock from '../testUtils/createStoreMock'
import ReviewContainer from '../../app/containers/Review/ReviewContainer'

jsdomGlobal()
chai.use(chaiEnzyme())

describe('Review container', function() {
  it('exists', function() {
    const store = createStoreMock()
    const wrapper = mount(
      <Provider store={store}>
        <ReviewContainer />
      </Provider>
    )

    expect(wrapper).to.exist
  })
})