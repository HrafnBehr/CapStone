import './App.css'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Card,
  TextField,
  Button,
  CardContent,
  Stack,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import { useToast } from './hooks/useToast'
import { PathwayPicker } from './components/PathwayPicker'
import { UserPicker } from './components/UserPicker'

export default function CreateProgram() {
  const navigate = useNavigate()
  const toast = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const programDetails = {
      name: formData.get('name'),
      start_date: formData.get('start_date'),
      end_date: formData.get('end_date'),
      description: formData.get('description'),
      pathway_id: formData.get('pathway_id'),
      project_manager_id: formData.get('project_manager_id'),
    }

    try {
      const response = await fetch('http://localhost:8080/api/v1/projects', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(programDetails),
      })

      if (!response.ok) {
        throw new Error('failed to fulfill your request')
      }

      toast.success('New program added to listing')
      navigate('/')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <Container fixed maxWidth='sm'>
        <Card>
          <CardContent>
            <h1>Create A Project</h1>

            <form onSubmit={handleSubmit}>
              <Stack gap={2}>
                <TextField id='name' name='name' label='Project Name' />

                <TextField
                  id='description'
                  name='description'
                  label='Project Description'
                  multiline
                  rows={5}
                />

                <DatePicker
                  label='Start Date'
                  id='start_date'
                  name='start_date'
                  defaultValue={dayjs()}
                />

                <DatePicker
                  label='End Date'
                  id='end_date'
                  name='end_date'
                  defaultValue={dayjs()}
                />

                <PathwayPicker />

                <UserPicker label='Project Manager' is_pm={true} />

                <Button variant='contained' type='submit'>
                  Create
                </Button>

                <Button
                  variant='outlined'
                  type='button'
                  onClick={() => navigate('/')}
                >
                  Back
                </Button>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}
