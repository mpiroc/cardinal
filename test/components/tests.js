import 'babel-polyfill'
import React from 'react'
import { expect } from 'chai'
import { shallow, mount, render } from 'enzyme'
import sinon from 'sinon'
import nock from 'nock'

function HelloWorld (props) {
  return (
    <div>{'Hello, World!'}</div>
  )
}

let wrapper
describe('HelloWorld component', () => {
  beforeEach(() => {
    wrapper = shallow(<HelloWorld />)
  })

  it('should exist', () => {
    expect(wrapper).to.exist
  })
})