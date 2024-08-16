// import './LoginPage.css'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import cookie from 'cookie';
import {
  Container,
  Card,
  TextField,
  Button,
  CardContent,
  Stack,
  FormControl,
  FormControlLabel,
  Checkbox,
} from '@mui/material'
// import UserContext from "./AuthMaker"
import { useAuth } from './hooks/useAuth'

export default function Login() {
  const navigate = useNavigate()
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')
  const [flag, setFlag] = useState(false)
  const { setIsAuthenticated } = useAuth()

  // const { user, login, logout } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault()

    const userData = {username: username}

    try {
      const response = await fetch(`http://localhost:8080/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Invalid login credentials')
      } else {
        setIsAuthenticated(true)
        // document.cookie=`username=${username}`;
        // login(userData)
        navigate('/')
      }
    } catch (error) {
      console.log(error)
      console.error('Unable to log you in...')
    }
  }

  const handleLogout = () => {
    // logout();
    setFlag(!flag)
  }

  return (
    <>
      <Container fixed maxWidth='sm'>
        <Card>
          <CardContent>
            <h1>Login</h1>
            <form>
              <Stack>
                <FormControl>
                  <TextField
                    sx={{ m: 1 }}
                    id='username-login'
                    label='Username'
                    variant='outlined'
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete='username'
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    sx={{ m: 1 }}
                    id='username-password'
                    type='password'
                    label='Password'
                    variant='outlined'
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete='current-password'
                  />
                </FormControl>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label='Remember Me'
                />
                <Button
                  sx={{ mt: 1 }}
                  variant='contained'
                  type='submit'
                  onClick={handleLogin}
                >
                  Login
                </Button>
                <Button
                  sx={{ mt: 1 }}
                  variant='outlined'
                  type='submit'
                  onClick={() => navigate('/CreateAccount')}
                >
                  Create Account
                </Button>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}
