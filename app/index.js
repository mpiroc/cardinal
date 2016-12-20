import React from 'react'
import ReactDOM from 'react-dom'

function HelloWorld (props) {
  return (
    <div><p>{'Hello, World!'}</p></div>
  )
}

ReactDOM.render(
  <HelloWorld />,
  document.getElementById('app')
)