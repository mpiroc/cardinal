import React, { PropTypes } from 'react'
import { Card, CardText, CardActions } from 'react-toolbox/lib/card'
import { Button } from 'react-toolbox/lib/button'
import MarkdownViewer from 'components/MarkdownViewer/MarkdownViewer'
import ReviewSnackbarContainer from 'containers/Review/ReviewSnackbarContainer'

export default function Review (props) {
  const {
    side1,
    side2,
    isAnswerVisible,
    isCurrentCardSet,
    onToggleAnswerVisible,
    onGrade,
  } = props

  return isCurrentCardSet ? (
    <div style={{ width: '50%', margin: '1.8rem auto' }}>
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
          <Button label={'0'} onClick={() => onGrade(0)} style={{ width: '3em' }} />
          <Button label={'1'} onClick={() => onGrade(1)} style={{ width: '3em' }} />
          <Button label={'2'} onClick={() => onGrade(2)} style={{ width: '3em' }} />
          <Button label={'3'} onClick={() => onGrade(3)} style={{ width: '3em' }} />
          <Button label={'4'} onClick={() => onGrade(4)} style={{ width: '3em' }} />
          <Button label={'5'} onClick={() => onGrade(5)} style={{ width: '3em' }} />
        </CardActions>
      </Card>
      <ReviewSnackbarContainer />
    </div>  
  ) : (
    <div style={{ textAlign: 'center', margin: '1.8em auto' }}>
      <span>{'All done! You have no more cards to review right now.'}</span>
    </div>
  )
}

Review.propTypes = {
  side1: PropTypes.string.isRequired,
  side2: PropTypes.string.isRequired,
  isAnswerVisible: PropTypes.bool.isRequired,
  isCurrentCardSet: PropTypes.bool.isRequired,
  onToggleAnswerVisible: PropTypes.func.isRequired,
  onGrade: PropTypes.func.isRequired,
}