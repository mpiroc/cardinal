import React, { PropTypes } from 'react'
import Delay from 'react-delay'
import Dialog from 'react-toolbox/lib/dialog'
import Input from 'react-toolbox/lib/input'
import ProgressBar from 'react-toolbox/lib/progress_bar'
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card'
import { WarningSnackbar, MarkdownViewer } from 'components'

export default function EditCardDialog ({
    isActive,
    isSaving,
    title,
    side1,
    side2,
    onSide1Change,
    onSide2Change,
    onCancel,
    onSave,
    isSnackbarActive,
    snackbarError,
    onDismissSnackbar,
  }) {
  
  const actions = [
    { label: 'Cancel', onClick: onCancel },
    { label: 'Save', onClick: onSave },
  ]

  return (
    <Dialog
      active={isActive}
      onEscKeyDown={onCancel}
      onOverlayClick={onCancel}
      actions={actions}
      title={title}
      >
      <section>
        <div style={{display: 'flex', flexDirection: 'column', margin: '0 0 1.8em 0'}}>
          <Input
            type='text' multiline
            label={'Side one'}
            hint={'You can use markdown here!'}
            maxLength={2000}
            value={side1}
            onChange={onSide1Change}
            disabled={isSaving}
          />
          <Card style={{margin: '1.8em 0 0 0', color: 'black'}}>
            <CardText>
              <MarkdownViewer markdown={side1} />
            </CardText>
          </Card>
        </div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <Input
            type='text' multiline
            label={'Side two'}
            hint={'You can use markdown here!'}
            maxLength={2000}
            value={side2}
            onChange={onSide2Change}
            disabled={isSaving}
          />
          <Card style={{margin: '1.8em 0 0 0', color: 'black'}}>
            <CardText>
              <MarkdownViewer markdown={side2} />
            </CardText>
          </Card>
        </div>
      </section>
      {
        // If save completes quickly, we don't want to briefly flash the progress bar. So we
        // wait 250 milliseconds before showing it.
        isSaving === true ? (
            <Delay wait={250}>
              <div style={{margin: '1.8rem 0 0 0'}}>
                <ProgressBar type='linear' mode='indeterminate' />
              </div>
            </Delay>
          ) :
          null
      }
      <WarningSnackbar
        isActive={isSnackbarActive}
        error={snackbarError}
        onDismissSnackbar={onDismissSnackbar}
      />
    </Dialog>
  )
}

EditCardDialog.propTypes = {
  isActive: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  side1: PropTypes.string.isRequired,
  side2: PropTypes.string.isRequired,
  onSide1Change: PropTypes.func.isRequired,
  onSide2Change: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  isSnackbarActive: PropTypes.bool.isRequired,
  snackbarError: PropTypes.string.isRequired,
  onDismissSnackbar: PropTypes.func.isRequired,
}