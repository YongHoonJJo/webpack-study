import React from 'react'
import ReactDOM from 'react-dom'
import Button from './Button.js'

function Container() {
  return React.createElement(
    'div',
    null,
    React.createElement('p', null, 'Click this button'),
    React.createElement(Button, { label: 'Like' }),
    React.createElement(Button, { label: 'Hate'})
  )
}

const domContainer = document.querySelector('#react-root')
ReactDOM.render(React.createElement(Container), domContainer)