import React, { PropTypes } from 'react'
import Dialog from 'react-toolbox/lib/dialog'
import Input from 'react-toolbox/lib/input'
import ProgressBar from 'react-toolbox/lib/progress_bar'
//import { NewCardDialogSnackbarContainer } from 'containers'
import Delay from 'react-delay'

export default function EditCardDialog (props) {
  const {
    isActive,
    isSaving,
    title,
    side1,
    side2,
    onSide1Change,
    onSide2Change,
    onCancel,
    onSave,
  } = props

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
        <Input
          type='text'
          label={'Side one'}
          maxLength={80}
          value={side1}
          onChange={onSide1Change}
          disabled={isSaving}
          />
        <Input
          type='text' multiline
          label={'Side two'}
          maxLength={1000}
          value={side2}
          onChange={onSide2Change}
          disabled={isSaving}
          />
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
}