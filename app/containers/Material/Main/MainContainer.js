import React, { PropTypes } from 'react'
import { MainSidebar } from 'components'
import { MainNavDrawerContainer, MainAppBarContainer } from 'containers'
import {
  Layout,
  Panel,
} from 'react-toolbox'

export default class MainContainer extends React.Component {
  render () {
    return (
      <div style={{height: '100vh'}}>
        <Layout>
          <MainNavDrawerContainer />
          <Panel>
            <MainAppBarContainer />
            <div style={{padding: '1.8rem', height: '100%' }}>
              {this.props.children}
            </div>
          </Panel>
        </Layout>
      </div>
    )
  }
}

MainContainer.propTypes = {
  
}