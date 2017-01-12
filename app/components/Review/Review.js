import React, { PropTypes } from 'react'
import { Card, CardText, CardActions } from 'react-toolbox/lib/card'
import { Button } from 'react-toolbox/lib/Button'
import MarkdownViewer from 'components/MarkdownViewer/MarkdownViewer'

export default function Review (props) {
  const {
    side1,
    side2,
    isAnswerVisible,
    onToggleAnswerVisible,
  } = props

  return (
    <div>
      <Card style={{ margin: '1.8em 0 0 0', color: 'black' }}>
        <CardText>
          <MarkdownViewer markdown={props.side1} />
        </CardText>
        <CardActions>
          <Button label={isAnswerVisible ? 'Hide Answer' : 'Show Answer'} onClick={onToggleAnswerVisible} />
        </CardActions>
      </Card>
      <Card style={{ margin: '1.8em 0 1.8em 0', color: 'black', display: isAnswerVisible ? 'block' : 'none' }}>
        <CardText>
          <MarkdownViewer markdown={props.side2} />
        </CardText>
        <CardActions>
          <Button label={'0'} style={{ width: '3em' }} />
          <Button label={'1'} style={{ width: '3em' }} />
          <Button label={'2'} style={{ width: '3em' }} />
          <Button label={'3'} style={{ width: '3em' }} />
          <Button label={'4'} style={{ width: '3em' }} />
          <Button label={'5'} style={{ width: '3em' }} />
        </CardActions>
      </Card>
    </div>
  )
}

Review.propTypes = {
  side1: PropTypes.string.isRequired,
  side2: PropTypes.string.isRequired,
  isAnswerVisible: PropTypes.bool.isRequired,
  onToggleAnswerVisible: PropTypes.func.isRequired,
}