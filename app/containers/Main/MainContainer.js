import React, { PropTypes } from 'react'
import { NavigationBarContainer } from 'containers'
import { innerContainer } from 'sharedStyles/styles.css'

export default class MainContainer extends React.Component {
  render () {
    return (
      <div>
        <NavigationBarContainer />
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

MainContainer.propTypes = {
  
}