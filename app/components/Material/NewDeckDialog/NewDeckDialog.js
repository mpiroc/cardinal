import React, { PropTypes } from 'react'
import Dialog from 'react-toolbox/lib/dialog'

export default function NewDeckDialog (props) {
  const { isActive, onCancel, onSave } = props
  const actions = [
    { label: 'Cancel', onClick: onCancel },
    { label: 'Save', onClick: onCancel },
  ]

  return (
    <Dialog
      active={isActive}
      onEscKeyDown={onCancel}
      onOverlayClick={onCancel}
      actions={actions}
      title={'Create New Deck'}>
      <p>{'Dialog content'}</p>
    </Dialog>
  )
}

NewDeckDialog.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
}