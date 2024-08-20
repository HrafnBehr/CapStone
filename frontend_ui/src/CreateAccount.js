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
  Typography,
} from '@mui/material'
import { useToast } from './hooks/useToast'

export default function CreateAccount() {
  const navigate = useNavigate()
  const toast = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const accountDetails = {
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      username: formData.get('username'),
      password: formData.get('password'),
      is_pm: formData.get('is_pm'),
    }

    try {
      const response = await fetch(
        'http://localhost:8080/api/v1/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(accountDetails),
        },
      )

      if (!response.ok) {
        throw new Error('Failed to fulfill your request.')
      }

      navigate('/login')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <Container
      maxWidth='sm'
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card sx={{ flexGrow: 1 }}>
        <CardContent>
          <Typography variant='h4' component='h1' sx={{ mb: 3 }}>
            Create Account
          </Typography>

          <Stack as='form' onSubmit={handleSubmit} spacing={2}>
            <TextField label='Username' variant='outlined' name='username' />

            <TextField label='First Name' name='first_name' />
            <TextField label='Last Name' variant='outlined' name='last_name' />
            <TextField
              label='Password'
              type='password'
              name='password'
              autoComplete='new-password'
            />
            <FormControlLabel
              control={<Checkbox defaultChecked name='is_pm' />}
              label='Are you a program manager?'
            />
            <Button sx={{ mt: 2 }} variant='contained' type='submit'>
              Create Account
            </Button>
            <Button
              sx={{ mt: 1 }}
              variant='outlined'
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  )
}
