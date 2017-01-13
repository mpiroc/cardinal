import 'babel-polyfill'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { mount, render, shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import Cards from '../../app/components/Cards/Cards'
import { Map } from 'immutable'

chai.use(chaiEnzyme())

describe('Cards', function() {
  const cards = Map({
    "cardId1": {},
    "cardId2": {},
  })

  it('should exist', function() {
    const wrapper = shallow(<Cards deckId='deckId' cards={cards} />)
    expect(wrapper).to.exist
  })
})