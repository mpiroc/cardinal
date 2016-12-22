import React, { PropTypes } from 'react'
import { delegateLink } from './styles.css'

export default function DelegateLink (props) {
  const { onClick, children } = props
  return (
    <span className={delegateLink} onClick={onClick}>{children}</span>
  )
}

DelegateLink.propTypes = {
  onClick: PropTypes.func.isRequired,
}