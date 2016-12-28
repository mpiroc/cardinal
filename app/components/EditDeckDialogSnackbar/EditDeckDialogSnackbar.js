import React, { PropTypes } from 'react'
import { Snackbar } from 'react-toolbox'

export default function EditDeckDialogSnackbar (props) {
  const {
    isActive,
    error,
    onDismissSnackbar,
  } = props
  return (
    <Snackbar
      action={'Dismiss'}
      active={isActive}
      label={`Error saving deck: ${error}`}
      timeout={5000}
      onClick={onDismissSnackbar}
      onTimeout={onDismissSnackbar}
      type='warning'
    />
  )
}

EditDeckDialogSnackbar.propTypes = {
  isActive: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  onDismissSnackbar: PropTypes.func.isRequired,
}