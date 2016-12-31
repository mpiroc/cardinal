import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { mount, render, shallow } from 'enzyme'
import React from 'react'
import MarkdownViewer from '../app/components/MarkdownViewer/MarkdownViewer'

chai.use(chaiEnzyme())

describe('MarkdownViewer component', function() {
  it('should return exist', function() {
    const wrapper = shallow(<MarkdownViewer markdown={'Some Markdown'} />)
    expect(wrapper).to.exist
  })
})