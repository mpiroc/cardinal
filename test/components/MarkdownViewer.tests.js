import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { mount, render, shallow } from 'enzyme'
import React from 'react'
import MarkdownViewer from '../../app/components/MarkdownViewer/MarkdownViewer'

chai.use(chaiEnzyme())

describe('MarkdownViewer component', function() {
  it('should return exist', function() {
    const wrapper = shallow(<MarkdownViewer markdown={'text'} />)
    expect(wrapper).to.exist
  })

  it('should render markdown as html', function() {
    const wrapper = shallow(<MarkdownViewer markdown={'*text*'} />)
    expect(wrapper).to.have.html('<div><p><em>text</em></p>\n</div>')
  })

  it('should sanitize html in input', function() {
    const wrapper = shallow(<MarkdownViewer markdown={'<b>text</b>'} />)
    expect(wrapper).to.have.html('<div><p>&lt;b&gt;text&lt;/b&gt;</p>\n</div>')
  })
})