import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NewDeckModal } from 'components'
import * as newDeckModalActionCreators from 'redux/modules/newDeckModal'

class NewDeckModalContainer extends React.Component {
  render () {
    const { isOpen, isSaving, name, error } = this.props
    return (
      <NewDeckModal
        isOpen={isOpen}
        isSaving={isSaving}
        name={name}
        error={error} />
    )
  }
}

NewDeckModalContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
}

function mapStateToProps (state, props) {
  return {
    isOpen: state.getIn(['newDeckModal', 'isOpen']),
    isSaving: state.getIn(['newDeckModal', 'isSaving']),
    name: state.getIn(['newDeckModal', 'name']),
    error: state.getIn(['newDeckModal', 'error']),
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(newDeckModalActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewDeckModalContainer)