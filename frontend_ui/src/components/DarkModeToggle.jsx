import { IconButton, useColorScheme } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

export function DarkModeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme()

  return (
    <IconButton
      onClick={() => {
        setColorScheme(colorScheme === 'light' ? 'dark' : 'light')
      }}
      color='inherit'
    >
      {colorScheme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  )
}
