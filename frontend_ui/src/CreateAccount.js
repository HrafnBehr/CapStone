import './App.css'
// import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
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
  const [accountDetails, setAccountDetails] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    is_pm: true,
  })
  // let [fname, setFname] = useState('')
  // let [lname, setLname] = useState('')
  // let [username, seUsername] = useState('')
  // let [password, setPassword] = useState('')

  async function handleCreateAccount() {
    try {
      let response = await fetch(`http://localhost:8080/api/v1/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountDetails),
      })

      if (response.ok) {
        navigate('/')
      } else {
        throw new Error('failed to fulfill your request, gohome.')
      }
    } catch (error) {
      console.log(error)
    }
  }

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
                    onChange={(e) =>
                      setAccountDetails({
                        ...accountDetails,
                        first_name: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl sx={{ mt: 1 }}>
                  <TextField
                    id='outlined-basic'
                    label='Last Name'
                    variant='outlined'
                    onChange={(e) =>
                      setAccountDetails({
                        ...accountDetails,
                        last_name: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl sx={{ mt: 1 }}>
                  <TextField
                    id='outlined-basic'
                    label='Username'
                    variant='outlined'
                    onChange={(e) =>
                      setAccountDetails({
                        ...accountDetails,
                        username: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl sx={{ mt: 1 }}>
                  <TextField
                    id='outlined-basic'
                    label='Password'
                    type='password'
                    variant='outlined'
                    onChange={(e) =>
                      setAccountDetails({
                        ...accountDetails,
                        password: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label='Are you a program manager?'
                  onChange={(e) =>
                    setAccountDetails({
                      ...accountDetails,
                      is_pm: !accountDetails.is_pm,
                    })
                  }
                />
                <Button
                  sx={{ mt: 1 }}
                  variant='contained'
                  //type='submit'
                  onClick={() => handleCreateAccount()}
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
