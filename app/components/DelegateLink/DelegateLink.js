import React, { PropTypes } from 'react'
import { delegateLink } from './styles.css'

export default function DelegateLink (props) {
  return (
    <span className={delegateLink} onClick={props.onClick}>Sign In</span>
  )
}

DelegateLink.propTypes = {
  onClick: PropTypes.func.isRequired,
}