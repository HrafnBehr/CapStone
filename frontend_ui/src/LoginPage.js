import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Card,
  TextField,
  Button,
  CardContent,
  Stack,
  FormControlLabel,
  Checkbox,
  Box,
  CardHeader,
  Typography,
} from '@mui/material'
import { useAuth } from './hooks/useAuth'
import { login } from './api/users'
import { useToast } from './hooks/useToast'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const toast = useToast()
  const navigate = useNavigate()
  const { setIsAuthenticated, setUser } = useAuth()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

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
      <Container maxWidth='sm'>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
          as='form'
        >
          <Card variant='outlined' sx={{ width: '100%' }}>
            <CardHeader
              title={
                <Typography
                  variant='h4'
                  component='h1'
                  sx={{ textAlign: 'center' }}
                >
                  Login
                </Typography>
              }
            />

            <CardContent>
              <Stack gap={2}>
                <TextField
                  id='username-login'
                  label='Username'
                  variant='outlined'
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete='username'
                  fullWidth
                />

                <TextField
                  id='username-password'
                  type='password'
                  label='Password'
                  variant='outlined'
                  onChange={(e) => setPassword(e.target.value)}
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
                  onClick={handleLogin}
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  )
}
