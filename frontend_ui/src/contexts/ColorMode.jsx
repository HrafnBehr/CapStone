import { createTheme, ThemeProvider } from '@mui/material'
import { createContext, useMemo, useState } from 'react'
import { theme as baseTheme } from '../theme'
import { useLocalStorage } from '@uidotdev/usehooks'

export const ColorModeContext = createContext({ toggleColorMode: () => {} })

export default function ColorModeProvider({ children }) {
  const [mode, setMode] = useLocalStorage('color-mode', 'light')

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    [setMode],
  )

  const theme = useMemo(
    () =>
      createTheme({
        ...baseTheme,
        palette: {
          mode,
        },
      }),
    [mode],
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  )
}
