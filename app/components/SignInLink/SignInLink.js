import React, { PropTypes } from 'react'

export default function SignInLink (props) {
  return (
    <span onClick={props.onClick}>Sign In</span>
  )
}

SignInLink.propTypes = {
  onClick: PropTypes.func.isRequired,
  isAuthed: PropTypes.bool.isRequired,
}