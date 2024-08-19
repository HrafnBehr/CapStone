import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Container,
  Card,
  TextField,
  Button,
  CardContent,
  Stack,
  FormControl,
  Box,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

export default function SingleProgram() {
  const [project, setProject] = useState()
  const [milestone, setMilestone] = useState()
  const [flag, setFlag] = useState(false)

  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/projects/${id}`)
      .then((res) => res.json())
      .then((data) => setProject(data.project))
  }, [id])

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/tasks?project_id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMilestone(data)
        console.log(data)
      })
  }, [id])

  if (!project) return 'Loading...'

  const handleUpdate = async (e) => {
    e.preventDefault()
    await fetch(`http://localhost:8080/api/v1/projects/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
    setFlag(!flag)
    // After update, send user back to home page
    navigate('/Home')
  }

  return (
    <>
      <Container>
        <Card>
          <CardContent>
            <h1>Editing {project.name}</h1>
            <form onSubmit={handleUpdate}>
              <Stack>
                <FormControl>
                  <TextField
                    sx={{ m: 1 }}
                    id='outlined-basic'
                    label='Program Name'
                    defaultValue={project.name}
                    variant='outlined'
                    onChange={(e) =>
                      setProject({
                        ...project,
                        name: e.target.value,
                      })
                    }
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
                    onChange={(e) =>
                      setProject({
                        ...project,
                        description: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl>
                  <Box display='flex' justifyContent='space-around'>
                    <Button sx={{ m: 1 }} variant='contained'>
                      Milestone A
                    </Button>
                    <Button sx={{ m: 1 }} variant='contained'>
                      Milestone B
                    </Button>
                    <Button sx={{ m: 1 }} variant='contained'>
                      Milestone C
                    </Button>
                  </Box>
                </FormControl>
                <Box display='flex' justifyContent='space-around'>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ m: 1 }}
                      defaultValue={dayjs(project.start_date)}
                      label='Start Date'
                      onChange={(e) =>
                        setProject({
                          ...project,
                          start_date: dayjs(e).valueOf(),
                        })
                      }
                    />
                  </LocalizationProvider>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ m: 1 }}
                      defaultValue={dayjs(project.end_date)}
                      label='End Date'
                      onChange={(e) =>
                        setProject({
                          ...project,
                          end_date: dayjs(e).valueOf(),
                        })
                      }
                    />
                  </LocalizationProvider>
                </Box>
                <Button sx={{ mt: 1 }} variant='contained' type='submit'>
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
