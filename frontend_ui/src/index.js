import React, { Fragment } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './theme'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Fragment>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Fragment>,
)
