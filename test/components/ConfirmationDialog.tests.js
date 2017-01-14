import 'babel-polyfill'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { mount, render, shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import ConfirmationDialog from '../../app/components/ConfirmationDialog/ConfirmationDialog'

chai.use(chaiEnzyme())

describe('ConfirmationDialog', function() {
  let confirmSpy
  let cancelSpy
  let wrapper
  let actions

  beforeEach(function() {
    confirmSpy = sinon.spy()
    cancelSpy = sinon.spy()

    wrapper = shallow(
      <ConfirmationDialog title={'myTitle'} message={'myMessage'} onConfirm={confirmSpy} onCancel={cancelSpy} />
    )

    actions = wrapper.find('[data-test-id="dialog"]').prop('actions')
  })

  it('should exist', function() {
    expect(wrapper).to.exist
  })

  it('should have a cancel button', function() {
    expect(actions[0].label).to.equal('Cancel')
  })

  it('should have a confirm button', function() {
    expect(actions[1].label).to.equal('Confirm')
  })

  it('should call onCancel when cancel button is clicked', function() {
    actions[0].onClick()
    expect(cancelSpy).to.have.property('callCount', 1)
  })

  it('should call onConfirm when confirm button is clicked', function() {
    actions[1].onClick()
    expect(confirmSpy).to.have.property('callCount', 1)
  })
})