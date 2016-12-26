import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Card } from 'components'

function mapStateToProps ({cards}, props) {
  return {
    card: cards.getIn(['cards', props.cardId])
  }
}

export default connect(
  mapStateToProps,
)(Card)