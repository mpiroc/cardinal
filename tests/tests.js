import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import nock from 'nock';

const HelloWorldComponent = props => {
  return (
    <div>{'Hello, World!'}</div>
  )
}

let wrapper
describe('Test suite for HelloWorldComponent', () => {
  beforeEach(() => {
    wrapper = shallow(<HelloWorldComponent />)
  })

  it('should exist', () => {
    expect(wrapper).to.exist
  })
})