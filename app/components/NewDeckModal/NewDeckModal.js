import React, { PropTypes } from 'react'
import { default as ReactModal } from 'react-modal'
import { DelegateLink } from 'components'
import { modal, mainContainer, topBar, closeButton, content, textField, actionContainer, submitButton } from './styles.css'

export default function NewDeckModal (props) {
  const { isOpen, isSaving, name, error, updateNewDeckName, closeNewDeckModal, saveAndHandleNewDeck } = props

  return (
    <span>
      <ReactModal className={modal} isOpen={isOpen} contentLabel={'Create New Deck'}>
        <div className={mainContainer}>
          <div className={topBar}>
            <DelegateLink onClick={closeNewDeckModal}>{String.fromCharCode('10006')}</DelegateLink>
          </div>
          <div className={content}>
            <input className={textField}
                   type='text' value={name} maxLength={80} placeholder={'Name'}
                   onChange={(e) => updateNewDeckName(e.target.value)} />
            <div className={actionContainer}>
              <DelegateLink onClick={saveAndHandleNewDeck}>{'Create'}</DelegateLink>
            </div>
          </div>
        </div>
      </ReactModal>
    </span>
  )
}

NewDeckModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  updateNewDeckName: PropTypes.func.isRequired,
  closeNewDeckModal: PropTypes.func.isRequired,
  saveAndHandleNewDeck: PropTypes.func.isRequired,
}