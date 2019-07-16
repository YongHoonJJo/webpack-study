import React from 'react'
import ReactDom from 'react-dom'

function App() {
  return (
    <div>
      <h3>Hello, Webpack Plugin</h3>
      <p>html-webpack-plugin plugin</p>
      <p>{`App version : ${APP_VERSION}`}</p>
      <p>{`10 * 10 = ${TEN * TEN}`}</p>
    </div>
  )
}

ReactDom.render(<App />, $('#root')[0])