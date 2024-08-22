import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { colorSchemes } from './color-schemes'

export function createTheme() {
  const theme = extendTheme({
    colorSchemes: colorSchemes(),
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '#root': {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          },
        },
      },
    },
  })

  return theme
}
