import './App.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Card,
  TextField,
  Button,
  CardContent,
  Stack,
  FormControl,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { PathwaySelect } from './components/PathwaySelect'
import { ProjectManagerSelect } from './components/ProjectManagerSelect'

export default function CreateProgram() {
  // enables navigate
  const navigate = useNavigate()

  const [projectDetails, setProjectDetails] = useState({
    name: '',
    start_date: new Date(),
    end_date: new Date(),
    description: '',
    pathway_id: null,
    project_manager_id: null,
  })

  // our async addProgram which handles adding a program to the ui by fetching the endpoint data
  const addProgram = async (e) => {
    // prevents default action from being taken unless explicitly done so
    e.preventDefault()

    // try hook that leads into our fetch
    try {
      // our fetch reaching out to our data endpoint and what it is communicating
      const response = await fetch('http://localhost:8080/api/v1/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        // turning the data of programToBeMade into string data for the database
        body: JSON.stringify(projectDetails),
      })

      if (!response.ok) {
        throw new Error('failed to fulfill your request')
      }

      alert('New program added to listing')
      navigate('/')

      // catch hook for our above try
    } catch (error) {
      // error message for us to quickly identify where our code is skitzing out
      console.error('Error upon adding program: check lines 42-60', error)
    }
  }

  return (
    <>
      <Container fixed maxWidth='sm'>
        <Card>
          <CardContent>
            <h1>Create A Project</h1>

            <form onSubmit={addProgram}>
              <Stack gap={2}>
                <FormControl>
                  <TextField
                    id='project-name'
                    label='Project Name'
                    variant='outlined'
                    onChange={(e) =>
                      setProjectDetails({
                        ...projectDetails,
                        name: e.target.value,
                      })
                    }
                  />
                </FormControl>

                <FormControl>
                  <TextField
                    id='project-description'
                    label='Project Description'
                    variant='outlined'
                    multiline
                    rows={5}
                    onChange={(e) =>
                      setProjectDetails({
                        ...projectDetails,
                        description: e.target.value,
                      })
                    }
                  />
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label='Start Date'
                    id='start_date'
                    defaultValue={dayjs(projectDetails.start_date)}
                    onChange={(e) =>
                      setProjectDetails({
                        ...projectDetails,
                        start_date: dayjs(e).valueOf(),
                      })
                    }
                  />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label='End Date'
                    id='end_date'
                    defaultValue={dayjs(projectDetails.end_date)}
                    onChange={(e) =>
                      setProjectDetails({
                        ...projectDetails,
                        end_date: dayjs(e).valueOf(),
                      })
                    }
                  />
                </LocalizationProvider>

                <PathwaySelect
                  pathwayId={projectDetails.pathway_id}
                  setPathway={(e) => {
                    setProjectDetails({
                      ...projectDetails,
                      pathway_id: e.target.value,
                    })
                  }}
                />

                <ProjectManagerSelect
                  projectManagerId={projectDetails.project_manager_id}
                  setProjectManager={(e) => {
                    setProjectDetails({
                      ...projectDetails,
                      project_manager_id: e.target.value,
                    })
                  }}
                />

                <Button
                  variant='contained'
                  type='submit'
                  onClick={() => addProgram}
                >
                  Create
                </Button>
                <Button
                  variant='outlined'
                  type='button'
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
