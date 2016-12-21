import React, { PropTypes } from 'react'
import { NavigationBarContainer } from 'containers'

export default class MainContainer extends React.Component {
  render () {
    return (
      <div>
        <NavigationBarContainer />
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

MainContainer.propTypes = {
  
}