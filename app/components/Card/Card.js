import React, { PropTypes } from 'react'

export default function Card ({card}) {
  return (
    card ? (
      <div>
        <div>{card.get('side1')}</div>
        <div>{card.get('side2')}</div>
      </div>
    ) : (
      <div>{'Loading...'}</div>
    )
  )
}

Card.propTypes = {
  card: PropTypes.object
}