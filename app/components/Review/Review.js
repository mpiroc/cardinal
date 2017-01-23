import React, { PropTypes } from 'react'
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card'
import { Button } from 'react-toolbox/lib/button'
import Slider from 'react-toolbox/lib/slider'
import MarkdownViewer from 'components/MarkdownViewer/MarkdownViewer'
import ReviewSnackbarContainer from 'containers/Review/ReviewSnackbarContainer'

function getGradeDescription(grade) {
  switch(grade) {
    case 0:
      return 'I completely forgot the answer.'
    case 1:
      return 'I forgot most of the answer.'
    case 2:
      return 'I forgot some of the answer.'
    case 3:
      return 'I remembered the answer with much difficulty.'
    case 4:
      return 'I remembered the answer without some difficulty.'
    case 5:
      return "I remembered the answer without any difficulty."
    default:
      return `Invalid grade: ${grade}. Grade must be between 0-5 inclusive.`
  }
}

export default function Review (props) {
  const {
    side1,
    side2,
    isAnswerVisible,
    selectedGrade,
    isCurrentCardSet,
    onToggleAnswerVisible,
    onSelectGrade,
    onGrade,
  } = props

  return isCurrentCardSet ? (
    <div style={{ width: '50%', margin: '1.8rem auto', display: 'flex', flexDirection: 'column' }}>
      <Card style={{ margin: '1.8em 0 0 0', color: 'black' }}>
        <CardText>
          <MarkdownViewer markdown={props.side1} />
        </CardText>
      </Card>
      <div style={{ margin: '1.8em 0 0 0', color: 'black', display: 'flex' }}>
        <Button
          style={{margin: '0 auto'}}
          label={isAnswerVisible ? 'Hide Answer' : 'Show Answer'}
          onClick={onToggleAnswerVisible}
        />
      </div>
      <Card style={{ margin: '1.8em 0 0 0', color: 'black', display: isAnswerVisible ? 'block' : 'none' }}>
        <CardText>
          <MarkdownViewer markdown={props.side2} />
        </CardText>
      </Card>
      <Card style={{ margin: '1.8em 0 0 0', display: isAnswerVisible ? 'flex' : 'none', flexDirection: 'column' }}>
        <CardTitle subtitle={getGradeDescription(selectedGrade)}>
          {'How well did you remember the answer?'}
        </CardTitle>
        <CardText style={{ margin: '1.8em 0 0 0'}}>
          <Slider
            pinned snaps min={0} max={5} step={1} value={selectedGrade}
            onChange={onSelectGrade}
          />
        </CardText>
        <CardActions>
          <Button label={'Next card'} onClick={() => onGrade(selectedGrade)} />
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
  selectedGrade: PropTypes.number.isRequired,
  isCurrentCardSet: PropTypes.bool.isRequired,
  onToggleAnswerVisible: PropTypes.func.isRequired,
  onSelectGrade: PropTypes.func.isRequired,
  onGrade: PropTypes.func.isRequired,
}