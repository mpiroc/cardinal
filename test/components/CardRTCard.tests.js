import 'babel-polyfill'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { mount, render, shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import CardRTCard from '../../app/components/CardRTCard/CardRTCard'

chai.use(chaiEnzyme())

describe('CardRTCard component', function() {
  let editSpy
  let deleteSpy

  beforeEach(function() {
    editSpy = sinon.spy()
    deleteSpy = sinon.spy()
  })

  it('should exist', function() {
    const wrapper = shallow(<CardRTCard isDeleting={false} side1={''} side2={''} onEdit={editSpy} onDelete={deleteSpy} />)
    expect(wrapper).to.exist
  })

  it('should hide progress bar while not deleting', function() {
    const wrapper = shallow(<CardRTCard isDeleting={false} side1={''} side2={''} onEdit={editSpy} onDelete={deleteSpy} />)
    expect(wrapper.find('#progressBar')).to.not.exist
  })

  it('should show progress bar while deleting', function() {
    const wrapper = shallow(<CardRTCard isDeleting={true} side1={''} side2={''} onEdit={editSpy} onDelete={deleteSpy} />)
    expect(wrapper.find('#progressBar')).to.exist
  })

  it('should briefly wait before showing progress bar', function() {
    const wrapper = shallow(<CardRTCard isDeleting={true} side1={''} side2={''} onEdit={editSpy} onDelete={deleteSpy} />)
    expect(wrapper.find('#progressBarDelay')).to.exist
  })

  it('should render side1 as markdown', function() {
    const wrapper = shallow(<CardRTCard isDeleting={true} side1={'*side one*'} side2={''} onEdit={editSpy} onDelete={deleteSpy} />)
  })

  it('should render side2 as markdown', function() {
    const wrapper = shallow(<CardRTCard isDeleting={true} side1={''} side2={'*side two*'} onEdit={editSpy} onDelete={deleteSpy} />)
  })

  it('should have an edit action', function() {
    const wrapper = shallow(<CardRTCard isDeleting={false} side1={''} side2={''} onEdit={editSpy} onDelete={deleteSpy} />)
  })

  it('should have a delete action', function() {
    const wrapper = shallow(<CardRTCard isDeleting={false} side1={''} side2={''} onEdit={editSpy} onDelete={deleteSpy} />)
  })

  it('should call onEdit when edit button is clicked', function() {
    const wrapper = shallow(<CardRTCard isDeleting={false} side1={''} side2={''} onEdit={editSpy} onDelete={deleteSpy} />)
  })

  it('should call onDelete when delete button is clicked', function() {
    const wrapper = shallow(<CardRTCard isDeleting={false} side1={''} side2={''} onEdit={editSpy} onDelete={deleteSpy} />)
  })
})