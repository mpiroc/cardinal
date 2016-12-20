import React, { PropTypes } from 'react'

export default class MainContainer extends React.Component {
  render () {
    return (
      <div>
        <p>{'Main'}</p>
        {this.props.children}
      </div>
    )
  }
}

MainContainer.propTypes = {
  
}