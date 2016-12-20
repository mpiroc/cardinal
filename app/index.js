import React from 'react'
import ReactDOM from 'react-dom'
import { hashHistory } from 'react-router'
import getRoutes from 'config/routes'

function HelloWorld (props) {
  return (
    <div><p>{'Hello, World!'}</p></div>
  )
}

ReactDOM.render(
  getRoutes(hashHistory),
  document.getElementById('app')
)