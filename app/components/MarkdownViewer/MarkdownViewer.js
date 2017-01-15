import React, { PropTypes } from 'react'
import marked from 'marked'
import { highlightAuto } from 'highlightjs'
import gfmCss from 'gfm.scss'

export default function MarkdownViewer (props) {
  marked.setOptions({
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: true,
    highlight: code => highlightAuto(code).value,
  })

  const innerHTML = marked(props.markdown)

  return (
    <div className={gfmCss['markdown-body']} dangerouslySetInnerHTML={{ __html: innerHTML }} />
  )
}

MarkdownViewer.propTypes = {
  markdown: PropTypes.string.isRequired,
}