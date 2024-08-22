import { AppBar, Box, Container, Toolbar } from '@mui/material'
import { DarkModeToggle } from './components/DarkModeToggle'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <>
      <AppBar elevation={0}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />

          <DarkModeToggle />
        </Toolbar>
      </AppBar>

      <Toolbar />

      <Container
        maxWidth='md'
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Outlet />
      </Container>
    </>
  )
}
