import React, { PropTypes } from 'react'

export default function SignInLink (props) {
  return (
    <a onClick={props.onClick}>Sign In</a>
  )
}

SignInLink.propTypes = {
  onClick: PropTypes.func.isRequired,
  isAuthed: PropTypes.bool.isRequired,
}