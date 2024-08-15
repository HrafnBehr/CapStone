import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Container,
  Paper,
  Card,
  TextField,
  Button,
  CardContent,
  Stack,
  FormControl,
  FormControlLabel,
  Checkbox,
  Box,
  Input,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import './SingleProgram.css'

export default function SingleProgram() {
  const navigate = useNavigate()
  const [project, setProject] = useState()
  const { id } = useParams()

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/projects/${id}`)
      .then((res) => res.json())
      .then((data) => setProject(data.project))
  }, [])
  //itemName

  if (!project) return 'Loading...'

  return (
    <>
      <Container>
        <Card>
          <CardContent>
            <h1>Editing {project.name}</h1>
            <form>
              <Stack>
                <FormControl>
                  <TextField
                    sx={{ m: 1 }}
                    id='outlined-basic'
                    label='Program Name'
                    defaultValue={project.name}
                    variant='outlined'
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    sx={{ m: 1 }}
                    id='outlined-basic'
                    label='Program Description'
                    defaultValue={project.description}
                    variant='outlined'
                    multiline
                    rows={5}
                  />
                </FormControl>
                <Box display='flex' justifyContent='space-around'>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ m: 1 }}
                      defaultValue={dayjs(project.start_date)}
                      label='Start Date'
                    />
                  </LocalizationProvider>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ m: 1 }}
                      defaultValue={dayjs(project.end_date)}
                      label='End Date'
                    />
                  </LocalizationProvider>
                </Box>
                <Button
                  sx={{ mt: 1 }}
                  variant='contained'
                  onClick={() => navigate('/Home')}
                >
                  Update
                </Button>
                <Button
                  sx={{ mt: 1 }}
                  variant='outlined'
                  onClick={() => navigate('/Home')}
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
