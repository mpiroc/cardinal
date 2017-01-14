import React, { PropTypes } from 'react'
import Dialog from 'react-toolbox/lib/dialog'
import dialogTheme from 'theme/dialog.css'

export default function ConfirmationDialog ({
    isActive,
    title,
    message,
    onConfirm,
    onCancel,
  }) {

  const actions = [
    { label: 'Cancel', onClick: onCancel },
    { label: 'Confirm', onClick: onConfirm },
  ]

  return (
    <Dialog
      data-test-id='dialog'
      active={isActive}
      onEscKeyDown={onCancel}
      onOverlayClick={onCancel}
      actions={actions}
      title={title}
      theme={dialogTheme}
      type='small'
    >
      <section>
        <span>{message}</span>
      </section>
    </Dialog>
  )
}

ConfirmationDialog.propTypes = {
  isActive: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}