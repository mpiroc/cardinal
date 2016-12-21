import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Decks } from 'components'
//import * as decksActionCreators from 'redux/modules/module'

class DecksContainer extends React.Component {
  render () {
    return (
      <Decks />
    )
  }
}

DecksContainer.propTypes = {
  
}

function mapStateToProps (state, props) {
  return {
  }
}

function mapDispatchToProps (dispatch, props) {
  //return bindActionCreators(decksActionCreators, dispatch)
}

export default connect(
  mapStateToProps//,
  //mapDispatchToProps
)(DecksContainer)