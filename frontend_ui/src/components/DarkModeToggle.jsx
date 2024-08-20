import { useTheme } from '@emotion/react'
import { IconButton } from '@mui/material'
import { useContext } from 'react'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { ColorModeContext } from '../contexts/ColorMode'

export function DarkModeToggle() {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)

  return (
    <IconButton onClick={colorMode.toggleColorMode} color='inherit'>
      {theme.palette.mode === 'dark' ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  )
}
