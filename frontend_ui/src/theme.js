import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#005e7c',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'html, body, #root': {
          minHeight: '100vh',
        },
      },
    },
    MuiButton: {},
  },
})
