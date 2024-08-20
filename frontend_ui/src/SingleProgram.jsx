import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Container,
  Card,
  TextField,
  Button,
  CardContent,
  Stack,
  Box,
  Table,
  TableContainer,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  Checkbox,
  CardHeader,
  CardActions,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import { useToast } from './hooks/useToast'
import { useAuth } from './hooks/useAuth'
import { CreateTaskModal } from './components/CreateTaskModal'
import { getProjectById, updateProject } from './api/projects'
import { getTasksByProjectId } from './api/tasks'

export default function SingleProgram() {
  const [project, setProject] = useState()
  const [tasks, setTasks] = useState([])

  const { id } = useParams()
  const { user } = useAuth()
  const toast = useToast()

  useEffect(() => {
    getProjectById(id).then((project) => setProject(project))
  }, [id])

  useEffect(() => {
    getTasksByProjectId(id).then((tasks) => setTasks(tasks))
  }, [id])

  if (!project) {
    return 'Loading...'
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const projectDetails = Object.fromEntries(formData)

    try {
      const updatedProject = await updateProject(id, projectDetails)
      setProject(updatedProject)
      toast.success('Project updated successfully')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleCreateTaskSuccess = () => {
    getTasksByProjectId(id).then((tasks) => setTasks(tasks))
  }

  return (
    <>
      <Container>
        <Stack gap={6}>
          <Card>
            <form onSubmit={handleUpdate}>
              <CardHeader title={`Editing ${project.name}`} />

              <CardContent>
                <Stack>
                  <TextField
                    sx={{ m: 1 }}
                    name='name'
                    label='Program Name'
                    defaultValue={project.name}
                    disabled={!user.is_pm}
                  />
                  <TextField
                    sx={{ m: 1 }}
                    label='Program Description'
                    defaultValue={project.description}
                    disabled={!user.is_pm}
                    name='description'
                    multiline
                    rows={5}
                  />
                  <Box display='flex' justifyContent='space-around'>
                    <DatePicker
                      sx={{ m: 1 }}
                      defaultValue={dayjs(project.start_date)}
                      label='Start Date'
                      name='start_date'
                      disabled={!user.is_pm}
                    />
                    <DatePicker
                      sx={{ m: 1 }}
                      defaultValue={dayjs(project.end_date)}
                      label='End Date'
                      name='end_date'
                      disabled={!user.is_pm}
                    />
                  </Box>
                </Stack>
              </CardContent>

              <CardActions sx={{ justifyContent: 'end' }}>
                {user.is_pm && (
                  <Button sx={{ mt: 1 }} variant='contained' type='submit'>
                    Save
                  </Button>
                )}
              </CardActions>
            </form>
          </Card>

          <Card>
            <CardHeader title='Tasks' />

            <Stack direction='row' sx={{ p: 2 }} justifyContent='space-between'>
              <Box sx={{ flexGrow: 1 }} />

              {user.is_pm && (
                <CreateTaskModal
                  project_id={project.id}
                  pathway_id={project.pathway_id}
                  onSuccess={handleCreateTaskSuccess}
                />
              )}
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
                          There are no tasks for this project
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
                          <DatePicker
                            label='Start date'
                            id={`start-date-${task.id}`}
                            value={dayjs(task.start_date)}
                            disabled={!user.is_pm}
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
                                toast.success('Start date updated successfully')
                              } catch (error) {
                                toast.error(error.message)
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <DatePicker
                            label='End date'
                            id={`end-date-${task.id}`}
                            value={dayjs(task.end_date)}
                            disabled={!user.is_pm}
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
          </Card>
        </Stack>
      </Container>
    </>
  )
}
