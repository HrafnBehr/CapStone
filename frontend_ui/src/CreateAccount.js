import './App.css'
// import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

export default function CreateAccount() {
  const navigate = useNavigate()
  // let [fname, setFname] = useState('')
  // let [lname, setLname] = useState('')
  // let [username, seUsername] = useState('')
  // let [password, setPassword] = useState('')

  return (
    <>
      <Container fixed maxWidth='sm'>
        <Card>
          <CardContent>
            <h1>Create Account</h1>
            <form>
              <Stack>
                <FormControl>
                  <TextField
                    id='outlined-basic'
                    label='First Name'
                    variant='outlined'
                  />
                </FormControl>
                <FormControl sx={{ mt: 1 }}>
                  <TextField
                    id='outlined-basic'
                    label='Last Name'
                    variant='outlined'
                  />
                </FormControl>
                <FormControl sx={{ mt: 1 }}>
                  <TextField
                    id='outlined-basic'
                    label='Username'
                    variant='outlined'
                  />
                </FormControl>
                <FormControl sx={{ mt: 1 }}>
                  <TextField
                    id='outlined-basic'
                    label='Password'
                    variant='outlined'
                  />
                </FormControl>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label='Are you a program manager?'
                />
                <Button
                  sx={{ mt: 1 }}
                  variant='contained'
                  type='submit'
                  onClick={() => navigate('/')}
                >
                  Create Account
                </Button>
                <Button
                  sx={{ mt: 1 }}
                  variant='outlined'
                  type='submit'
                  onClick={() => navigate('/')}
                >
                  Cancel
                </Button>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}
