import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { NavigationBarContainer } from 'containers'
import { innerContainer } from 'sharedStyles/styles.css'

class MainContainer extends React.Component {
  render () {
    return (
      <div>
        <NavigationBarContainer deckId={this.props.deckId} />
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

MainContainer.propTypes = {
  deckId: PropTypes.string
}

function mapStateToProps (state, props) {
  return {
    deckId: props.params ? props.params.deckId : null
  }
}

export default connect(
  mapStateToProps
)(MainContainer)