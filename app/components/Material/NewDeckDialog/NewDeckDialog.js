import React, { PropTypes } from 'react'
import Dialog from 'react-toolbox/lib/dialog'
import Input from 'react-toolbox/lib/input'

export default function NewDeckDialog (props) {
  const {
    isActive,
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
      title={'Create New Deck'}>
      <section>
        <Input
          type='text'
          label={'Name'}
          maxLength={80}
          value={name}
          onChange={onNameChange}
          />
        <Input
          type='text' multiline
          label={'Description'}
          maxLength={1000}
          value={description}
          onChange={onDescriptionChange}
          />
      </section>
    </Dialog>
  )
}

NewDeckDialog.propTypes = {
  isActive: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
}