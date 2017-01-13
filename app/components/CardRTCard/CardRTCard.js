import React, { PropTypes } from 'react'
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card'
import { Button } from 'react-toolbox/lib/button'
import ProgressBar from 'react-toolbox/lib/progress_bar'
import Delay from 'react-delay'
import MarkdownViewer from 'components/MarkdownViewer/MarkdownViewer'
import EditCardDialogContainer from 'containers/EditCardDialog/EditCardDialogContainer'

export default function CardRTCard ({
  isDeleting,
  side1,
  side2,
  nextReview,
  onEdit,
  onDelete,
}) {
  return (
    <div style={{display: 'flex', flexDirection: 'row', margin: '0 auto 1.8rem auto' }}>
      <Card style={{ width: '50%', justifyContent: 'space-between' }}>
        { nextReview ? <CardTitle subtitle={`Next due: ${nextReview}`} /> : null }
        <CardText>
          <MarkdownViewer data-test-id='side1MarkdownViewer' markdown={side1} />
          {
            // If save completes quickly, we don't want to briefly flash the progress bar. So we
            // wait 250 milliseconds before showing it.
            isDeleting === true ? (
                <Delay data-test-id='progressBarDelay' wait={250}>
                  <div style={{margin: '1.8rem 0 0 0'}}>
                    <ProgressBar data-test-id='progressBar' type='linear' mode='indeterminate' />
                  </div>
                </Delay>
              ) :
              null
          }
        </CardText>
        <CardActions>
          <Button data-test-id='editButton' label={'Edit'} onClick={onEdit} />
          <EditCardDialogContainer />

          <Button data-test-id='deleteButton' label={'Delete'} onClick={onDelete} />
        </CardActions>
      </Card>
      <Card style={{ width: '50%' }}>
        <CardText>
          <MarkdownViewer data-test-id='side2MarkdownViewer' markdown={side2} />
        </CardText>
      </Card>
    </div>
  )
}

CardRTCard.propTypes = {
  isDeleting: PropTypes.bool.isRequired,
  side1: PropTypes.string.isRequired,
  side2: PropTypes.string.isRequired,
  nextReview: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}