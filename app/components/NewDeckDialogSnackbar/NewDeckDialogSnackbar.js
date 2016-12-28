import React, { PropTypes } from 'react'
import { Snackbar } from 'react-toolbox'
import { FontIcon } from 'react-toolbox/lib/font_icon'

export default function NewDeckDialogSnackbar (props) {
  const {
    isActive,
    error,
    onDismissSnackbar,
  } = props
  return (
    <Snackbar
      action={'Dismiss'}
      active={isActive}
      label={`Error saving new deck: ${error}`}
      timeout={5000}
      onClick={onDismissSnackbar}
      onTimeout={onDismissSnackbar}
      type='warning'
    />
  )
}

NewDeckDialogSnackbar.propTypes = {
  isActive: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  onDismissSnackbar: PropTypes.func.isRequired,
}