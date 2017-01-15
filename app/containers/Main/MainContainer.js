import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MainAppBarContainer from 'containers/MainAppBar/MainAppBarContainer'
import { Layout, Panel } from 'react-toolbox/lib/layout'
import { ProgressBar } from 'react-toolbox/lib/progress_bar'
import { setAuthStateChangedListener } from 'redux/modules/auth'

class MainContainer extends React.Component {
  componentDidMount() {
    this.props.setAuthStateChangedListener()
  }
  render () {
    const { isAuthed, children } = this.props
    return (
      <div style={{height: '100vh'}}>
        <Layout>
          <Panel>
            <MainAppBarContainer />
            {
              isAuthed === undefined ? (
                <div style={{ height: '100%', display: 'flex' }}>
                  <div style={{ margin: 'auto' }}>
                    <ProgressBar type='circular' mode='indeterminate' /> 
                  </div>
                </div>
              ) : (
                <div style={{ height: '100%', overflow: 'auto' }}>
                  {children}
                </div>
              )
            }
          </Panel>
        </Layout>
      </div>
    )
  }
}

MainContainer.propTypes = {
  deckId: PropTypes.string,
  isAuthed: PropTypes.bool,
  setAuthStateChangedListener: PropTypes.func.isRequired,
}

function mapStateToProps(state, { params }) {
  return {
    deckId: params ? params.deckId : null,
    isAuthed: state.auth.get('isAuthed'),
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