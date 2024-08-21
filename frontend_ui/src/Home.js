import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Card,
  Button,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Chip,
  Stack,
} from '@mui/material'
import { useAuth } from './hooks/useAuth'
import DeleteIcon from '@mui/icons-material/Delete'
import dayjs from 'dayjs'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { ConfirmationDialog } from './components/ConfirmationDialog'
import { useToast } from './hooks/useToast'
import { CreateProgramDialog } from './components/CreateProgramDialog'
import { getProjects } from './api/projects'
import { ProgramStatusChip } from './components/ProgramStatusChip'

export default function YourHome() {
  const [data, setData] = useState([])

  const toast = useToast()
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const urlSearchParams = new URLSearchParams()
    if (user.is_pm) {
      urlSearchParams.append('project_manager_id', user.id)
    }

    fetch(`http://localhost:8080/api/v1/projects?${urlSearchParams}`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.projects)
      })
  }, [user])

  if (!data) return 'Loading...'

  const handleDeleteConfirmation = async (project) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/projects/${project.id}`,
        {
          method: 'DELETE',
          credentials: 'include',
        },
      )

      if (!response.ok) {
        throw new Error('Could not be deleted!')
      }

      setData(data.filter((p) => p.id !== project.id))
      toast.success(`${project.name} deleted successfully!`)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleCreateProgram = async (newProject) => {
    try {
      const projects = await getProjects()
      setData(projects)
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <Container maxWidth='lg'>
        <Typography variant='h4' component='h1' gutterBottom>
          Welcome, {user.username}! These are your available projects.
        </Typography>

        {user.is_pm && <CreateProgramDialog onSuccess={handleCreateProgram} />}

        <Grid container spacing={3} my={3}>
          {data.map((project) => (
            <Grid item xs={12} sm={6} lg={4} key={project.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <CardContent>
                  <Typography
                    gutterBottom
                    variant='h6'
                    component='div'
                    sx={{ fontWeight: 400 }}
                  >
                    {project.name}
                  </Typography>

                  <Typography
                    gutterBottom
                    variant='body2'
                    color='text.secondary'
                  >
                    {project.description}
                  </Typography>

                  <Typography variant='body2'>
                    Project Manager: {project.project_manager.first_name}{' '}
                    {project.project_manager.last_name}
                  </Typography>

                  <Typography variant='body2'>
                    Start Date:{' '}
                    {dayjs(project.start_date).format('YYYY-MMM-DD')}
                  </Typography>

                  <Typography variant='body2'>
                    End Date: {dayjs(project.end_date).format('YYYY-MMM-DD')}
                  </Typography>
                </CardContent>

                <CardActions disableSpacing sx={{ px: 2 }}>
                  <ProgramStatusChip project={project} />

                  <Stack direction='row' spacing={1} sx={{ ml: 'auto' }}>
                    {true && (
                      <ConfirmationDialog
                        title='Delete Project'
                        content={
                          <>
                            Are you sure you want to delete the project{' '}
                            <strong>{project.name}</strong>?
                          </>
                        }
                        onConfirm={() => handleDeleteConfirmation(project)}
                      >
                        {(showDialog) => (
                          <Button
                            variant='outlined'
                            size='small'
                            color='error'
                            disableElevation
                            onClick={showDialog}
                          >
                            <DeleteIcon />
                          </Button>
                        )}
                      </ConfirmationDialog>
                    )}

                    <Button
                      variant='contained'
                      disableElevation
                      size='small'
                      onClick={() => navigate(`/Program/${project.id}`)}
                    >
                      View
                    </Button>
                  </Stack>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}
