import React, { PropTypes } from 'react'
import { delegateLink } from './styles.css'

export default function DelegateLink (props) {
  const { onClick, label } = props
  return (
    <span className={delegateLink} onClick={onClick}>{label}</span>
  )
}

DelegateLink.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
}