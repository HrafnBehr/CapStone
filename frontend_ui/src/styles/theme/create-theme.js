import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { colorSchemes } from './color-schemes'

export function createTheme() {
  const theme = extendTheme({
    colorSchemes: colorSchemes(),
  })

  return theme
}
