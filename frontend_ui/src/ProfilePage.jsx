import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  FormControl,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useAuth } from './hooks/useAuth'
import { useToast } from './hooks/useToast'

export default function ProfilePage() {
  const { user, setUser } = useAuth()
  const toast = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const userInfo = {
      username: formData.get('username'),
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
    }

    try {
      const res = await fetch(`http://localhost:8080/api/v1/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userInfo),
      })

      if (res.ok) {
        setUser((prevUser) => ({ ...prevUser, ...userInfo }))
        toast.success('Profile updated!')
      } else {
        throw new Error('Could not update profile')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <Container maxWidth='md'>
      <Typography variant='h4' component='h1' sx={{ mb: 2 }}>
        Profile
      </Typography>

      <Card onSubmit={handleSubmit}>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <TextField
                  fullWidth
                  defaultValue={user.username}
                  name='username'
                  sx={{ mt: 1 }}
                />
              </FormControl>

              <FormControl>
                <FormLabel>First Name</FormLabel>
                <TextField
                  fullWidth
                  defaultValue={user.first_name}
                  name='first_name'
                  sx={{ mt: 1 }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <TextField
                  fullWidth
                  defaultValue={user.last_name}
                  name='last_name'
                  sx={{ mt: 1 }}
                />
              </FormControl>
            </Stack>
          </CardContent>

          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant='contained' type='submit'>
              Save
            </Button>
          </CardActions>
        </form>
      </Card>
    </Container>
  )
}
