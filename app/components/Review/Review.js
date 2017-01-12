import React, { PropTypes } from 'react'

export default function Review (props) {
  return (
    <div>
      <div>{`Side One: ${props.side1}`}</div>
      <div>{`Side One: ${props.side2}`}</div>
    </div>
  )
}

Review.propTypes = {
  side1: PropTypes.string.isRequired,
  side2: PropTypes.string.isRequired,
}