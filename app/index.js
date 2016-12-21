import React from 'react'
import ReactDOM from 'react-dom'
import { hashHistory } from 'react-router'
import getRoutes from 'config/routes'
import './styles.css'

ReactDOM.render(
  getRoutes(hashHistory),
  document.getElementById('app')
)