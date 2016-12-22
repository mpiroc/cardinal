import React, { PropTypes } from 'react'
import { default as ReactModal } from 'react-modal'

export default function NewDeckModal (props) {
  const { isOpen, isSaving, name, error } = props

  return (
    <span>
      <ReactModal isOpen={isOpen} contentLabel={'Create New Deck'}>
        <div>{`isSaving: ${isSaving}`}</div>
        <div>{`Name: ${name}`}</div>
        <div>{`Error: ${error}`}</div>
        <div>{`Close: ${String.fromCharCode('10006')}`}</div>
      </ReactModal>
    </span>
  )
}

NewDeckModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
}