import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  TextField,
  Button,
  Stack,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  Divider,
  Card,
  Grid,
} from '@mui/material'
import { useToast } from './hooks/useToast'
import { useAuth } from './hooks/useAuth'
import { login } from './api/users'
import { DarkModeToggle } from './components/DarkModeToggle'

export default function Login() {
  const [loading, setLoading] = useState(false)

  const toast = useToast()
  const navigate = useNavigate()
  const { setIsAuthenticated, setUser } = useAuth()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target)
    const username = formData.get('username')
    const password = formData.get('password')

    try {
      const isLoggedIn = await login({ username, password })
      if (!isLoggedIn) {
        throw new Error('Invalid login credentials')
      }

      const res = await fetch(
        `http://localhost:8080/api/v1/users/getUserInfo`,
        {
          credentials: 'include',
        },
      )

      const data = await res.json()
      setUser(data.user)
      setIsAuthenticated(true)
      navigate('/')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Container maxWidth='md'>
        <Box sx={{ mt: 8 }}>
          <Card>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Box sx={{ flexGrow: 1, flexBasis: 0 }}>
                  <Stack p={4} spacing={2} as='form' onSubmit={handleLogin}>
                    <Typography
                      variant='h4'
                      component='h1'
                      color='primary.main'
                      textAlign='center'
                    >
                      Login to your account
                    </Typography>
                    <Divider />

                    <Stack spacing={2}>
                      <TextField
                        label='Username'
                        name='username'
                        autoComplete='username'
                        fullWidth
                      />

                      <TextField
                        type='password'
                        label='Password'
                        name='password'
                        autoComplete='current-password'
                        fullWidth
                      />

                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label='Remember Me'
                        sx={{ width: 'fit-content' }}
                      />

                      <Button
                        variant='contained'
                        type='submit'
                        disabled={loading}
                      >
                        {loading ? 'Logging in...' : 'Sign In'}
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </Grid>

              <Grid item sm={6} display={{ xs: 'none', sm: 'grid' }}>
                <Box
                  sx={{
                    flexGrow: 1,
                    flexBasis: 0,
                    bgcolor: 'primary.dark',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Stack
                    p={4}
                    alignItems='center'
                    justifyContent='center'
                    color='white'
                  >
                    <Typography variant='h5' component='h2'>
                      Welcome to PROMPT
                    </Typography>
                    <Typography variant='body1'>
                      Begin Your Journey Here
                    </Typography>
                    <Button
                      variant='outlined'
                      color='inherit'
                      onClick={() => navigate('/register')}
                      sx={{ mt: 3 }}
                    >
                      Register
                    </Button>
                    <DarkModeToggle />
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Container>

      {/*       <Container maxWidth='lg'>
        <Box className='login-form'>
          <Box className='left-section'>
            <Typography variant='h4' component='h1' className='login-title'>
              Login to Your Account
            </Typography>
            <Stack
              direction='row'
              spacing={2}
              justifyContent='center'
              className='dark-mode-toggle'
            >
              <Typography variant='body2' className='dark-mode-text'>
                Try out our dark mode
              </Typography>
              <IconButton onClick={toggleDarkMode} color='inherit'>
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Stack>
            <Divider className='divider' />
            <form onSubmit={handleLogin} style={{ marginTop: '20px' }}>
              <Stack spacing={2}>
                <TextField
                  id='username-login'
                  label='Username'
                  variant='outlined'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete='username'
                  fullWidth
                  className='login-input'
                />

                <TextField
                  id='username-password'
                  type='password'
                  label='Password'
                  variant='outlined'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete='current-password'
                  fullWidth
                  className='login-input'
                />

                <FormControlLabel
                  control={
                    <Checkbox defaultChecked className='login-checkbox' />
                  }
                  label='Remember Me'
                  sx={{ width: 'fit-content', color: '#005E7C' }}
                />

                <Button
                  variant='contained'
                  type='submit'
                  disabled={loading}
                  className='login-button'
                >
                  {loading ? 'Logging in...' : 'Sign In'}
                </Button>
              </Stack>
            </form>
          </Box>

          <Box className='right-section'>
            <Typography variant='h5' component='h2' className='signup-title'>
              Welcome to PROMPT
            </Typography>
            <Typography variant='body1' className='signup-subtitle'>
              Begin Your Journey Here
            </Typography>
            <Button
              variant='outlined'
              color='secondary'
              onClick={() => navigate('/register')}
              className='signup-button'
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container> */}
    </>
  )
}
