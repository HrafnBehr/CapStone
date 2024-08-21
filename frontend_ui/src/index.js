import React, { Fragment } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  CssBaseline,
  Experimental_CssVarsProvider as CssVarsProvider,
} from '@mui/material'
import { createTheme } from './styles/theme/create-theme'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Fragment>
    <CssVarsProvider
      defaultColorScheme='light'
      defaultMode='light'
      theme={createTheme()}
    >
      <CssBaseline />
      <App />
    </CssVarsProvider>
  </Fragment>,
)
