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
  Typography,
  Paper,
  Table,
  TableContainer,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  Checkbox,
} from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { useToast } from './hooks/useToast'

export default function SingleProgram() {
  const [project, setProject] = useState()
  const [tasks, setTasks] = useState([])

  const navigate = useNavigate()
  const toast = useToast()
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
        setTasks(data.tasks)
      })
  }, [id])

  if (!project) {
    return 'Loading...'
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    try {
      await fetch(`http://localhost:8080/api/v1/projects/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      })
      toast.success('Project updated successfully')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <Container>
        <Stack gap={6}>
          <Card>
            <CardContent>
              <h1>Editing {project.name}</h1>
              <form onSubmit={handleUpdate} id='update-program-form'>
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

          <Paper as='form' id='update-task-form'>
            <Stack direction='row' sx={{ p: 2 }} justifyContent='space-between'>
              <Typography variant='h6'>Tasks</Typography>
              <Button variant='outlined'>Create New Task</Button>
            </Stack>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding='checkbox'>
                      <Checkbox color='primary' />
                    </TableCell>
                    <TableCell>Task</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Program</TableCell>
                    <TableCell>Pathway</TableCell>
                    <TableCell>Milestone</TableCell>
                    <TableCell>Activity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasks.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8}>
                        <Stack
                          direction='row'
                          gap={0.5}
                          alignItems='center'
                          justifyContent='center'
                        >
                          Click the <FilterListIcon /> to filter tasks.
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ) : (
                    tasks.map((task) => (
                      <TableRow key={task.id} hover>
                        <TableCell padding='checkbox'>
                          <Checkbox color='primary' />
                        </TableCell>
                        <TableCell>{task.title}</TableCell>
                        <TableCell>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label='Start date'
                              id={`start-date-${task.id}`}
                              value={dayjs(task.start_date)}
                              onChange={async (e) => {
                                try {
                                  await fetch(
                                    `http://localhost:8080/api/v1/tasks/${task.id}`,
                                    {
                                      method: 'PATCH',
                                      headers: {
                                        'Content-Type': 'application/json',
                                      },
                                      body: JSON.stringify({
                                        ...task,
                                        start_date: dayjs(e).toISOString(),
                                      }),
                                      credentials: 'include',
                                    },
                                  )
                                  toast.success(
                                    'Start date updated successfully',
                                  )
                                } catch (error) {
                                  toast.error(error.message)
                                }
                              }}
                            />
                          </LocalizationProvider>
                        </TableCell>
                        <TableCell>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label='End date'
                              id={`end-date-${task.id}`}
                              value={dayjs(task.end_date)}
                              onChange={async (e) => {
                                try {
                                  await fetch(
                                    `http://localhost:8080/api/v1/tasks/${task.id}`,
                                    {
                                      method: 'PATCH',
                                      headers: {
                                        'Content-Type': 'application/json',
                                      },
                                      body: JSON.stringify({
                                        ...task,
                                        end_date: dayjs(e).toISOString(),
                                      }),
                                      credentials: 'include',
                                    },
                                  )
                                  toast.success('End date updated successfully')
                                } catch (error) {
                                  toast.error(error.message)
                                }
                              }}
                            />
                          </LocalizationProvider>
                        </TableCell>
                        <TableCell>{task.project.name}</TableCell>
                        <TableCell>{task.pathway.name}</TableCell>
                        <TableCell>{task.milestone.name}</TableCell>
                        <TableCell>{task.activity.name}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Stack>
      </Container>
    </>
  )
}
