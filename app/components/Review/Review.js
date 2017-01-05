import React, { PropTypes } from 'react'
import MarkdownViewer from 'components/MarkdownViewer/MarkdownViewer'

export default function Review ({ side1, side2, isAnswerVisible, onGrade }) {
  return (
    <div>
      <MarkdownViewer markdown={side1} />
      <MarkdownViewer markdown={side2} />
      <Button label={'Right'} onClick={() => onGrade(true)} />
      <Button label={'Wrong'} onClick={() => onGrade(false)} />
    </div>
  )
}

Review.propTypes = {
  side1: PropTypes.string.isRequired,
  side2: PropTypes.string.isRequired,
  isAnswerVisible: PropTypes.bool.isRequired,
  onGrade: PropTypes.func.isRequired,  
}