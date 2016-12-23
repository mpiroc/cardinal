import React, { PropTypes } from 'react'
import { default as ReactModal } from 'react-modal'
import { DelegateLink } from 'components'

export default function NewCardModal (props) {
  const {
    isOpen, isSaving, side1, side2, error,
    updateNewCardSide1,
    updateNewCardSide2,
    closeNewCardModal,
    saveAndHandleNewCard
  } = props

  return (
    <span>
      <ReactModal isOpen={isOpen} contentLabel={'Create New Deck'}>
        <div>
          <div>
            <DelegateLink onClick={() => closeNewCardModal()}>{String.fromCharCode('10006')}</DelegateLink>
          </div>
          <div>
            <textarea type='text' value={side1} maxLength={10000} placeholder={'Side One'}
                   onChange={(e) => updateNewCardSide1(e.target.value)} />
            <textarea type='text' value={side2} maxLength={10000} placeholder={'Side Two'}
                   onChange={(e) => updateNewCardSide2(e.target.value)} />
            <div>
              <DelegateLink onClick={() => saveAndHandleNewCard()}>{'Create'}</DelegateLink>
            </div>
          </div>
        </div>
      </ReactModal>
    </span>
  )
}


NewCardModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  side1: PropTypes.string.isRequired,
  side2: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  updateNewCardSide1: PropTypes.func.isRequired,
  updateNewCardSide2: PropTypes.func.isRequired,
  closeNewCardModal: PropTypes.func.isRequired,
}