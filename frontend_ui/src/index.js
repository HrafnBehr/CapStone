import React, { Fragment } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CssBaseline } from '@mui/material'
import { registerLicense } from '@syncfusion/ej2-base'

registerLicense('@32362e302e30jIoteEMO6MkEWJMqD2N2QfeYu5V0D+JAGNqPEySI3R0=')

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Fragment>
    <CssBaseline />
    <App />
  </Fragment>,
)
