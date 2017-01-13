import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MainAppBarContainer from 'containers/MainAppBar/MainAppBarContainer'
import {
  Layout,
  Panel,
} from 'react-toolbox'
import { setAuthStateChangedListener } from 'redux/modules/auth'

class MainContainer extends React.Component {
  componentDidMount() {
    this.props.setAuthStateChangedListener(this.context.router.replace)
  }
  render () {
    return (
      <div style={{height: '100vh'}}>
        <Layout>
          <Panel>
            <MainAppBarContainer />
            <div style={{
              padding: '1.8rem',
              height: '100%',
              overflow: 'auto',
            }}>
              {this.props.children}
            </div>
          </Panel>
        </Layout>
      </div>
    )
  }
}

MainContainer.propTypes = {
  deckId: PropTypes.string,
  setAuthStateChangedListener: PropTypes.func.isRequired,
}

MainContainer.contextTypes = {
  router: PropTypes.object.isRequired
}

function mapStateToProps(state, { params }) {
  return {
    deckId: params ? params.deckId : null,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return bindActionCreators({
    setAuthStateChangedListener
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainContainer)