import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'html, body, #root': {
          minHeight: '100vh',
        },
      },
    },
  },
})
