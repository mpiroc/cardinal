import React, { PropTypes } from 'react'
import Dialog from 'react-toolbox/lib/dialog'
import Input from 'react-toolbox/lib/input'
import ProgressBar from 'react-toolbox/lib/progress_bar'
import { NewDeckDialogSnackbarContainer } from 'containers/Material'
import Delay from 'react-delay'

export default function NewDeckDialog (props) {
  const {
    isActive,
    isSaving,
    name,
    description,
    onNameChange,
    onDescriptionChange,
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
      title={'Create New Deck'}
      >
      <section>
        <Input
          type='text'
          label={'Name'}
          maxLength={80}
          value={name}
          onChange={onNameChange}
          disabled={isSaving}
          />
        <Input
          type='text' multiline
          label={'Description'}
          maxLength={1000}
          value={description}
          onChange={onDescriptionChange}
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
      <NewDeckDialogSnackbarContainer />
    </Dialog>
  )
}

NewDeckDialog.propTypes = {
  isActive: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
}