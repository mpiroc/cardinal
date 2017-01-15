import React, { PropTypes } from 'react'
import marked from 'marked'
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
  })

  const innerHTML = marked(props.markdown)

  return (
    <div className={gfmCss['markdown-body']} dangerouslySetInnerHTML={{ __html: innerHTML }} />
  )
}

MarkdownViewer.propTypes = {
  markdown: PropTypes.string.isRequired,
}