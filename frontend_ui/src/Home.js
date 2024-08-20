import './App.css'
import './Home.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Card, Button, CardContent } from '@mui/material'
import { useAuth } from './hooks/useAuth'

export default function YourHome() {
  const [data, setData] = useState([])
  const [deleteFlag, setDeleteFlag] = useState(false)

  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const urlSearchParams = new URLSearchParams()
    if (user.is_pm) {
      urlSearchParams.append('project_manager_id', user.id)
    }

    fetch(`http://localhost:8080/api/v1/projects?${urlSearchParams}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.projects)
      })
  }, [deleteFlag, user])

  if (!data) return 'Loading...'

  const deleteItem = async (projectID) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/projects/${projectID}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: ``,
          },
        },
      )

      if (!response.ok) {
        throw new Error('Could not be deleted!')
      }

      setDeleteFlag(!deleteFlag)

      alert('Item removed!')
    } catch (error) {
      console.error('Could not remove project', error)
    }
  }

  return (
    <>
      <Container maxWidth='lg'>
        <Card>
          <CardContent>
            <h1>
              {' '}
              Welcome, {user.username}! These are your available projects.
            </h1>
            {user.is_pm && (
              <Button
                sx={{ m: 1 }}
                variant='contained'
                type='submit'
                onClick={() => navigate('/CreateProgram')}
              >
                Create Program
              </Button>
            )}
          </CardContent>
          <Card>
            <CardContent>
              <div>
                <h2>Projectagrams</h2>
                {data.length === 0 ? (
                  <h3>You have no projects</h3>
                ) : (
                  data.map((project) => (
                    <div key={project.id}>
                      <h3
                        className='project'
                        onClick={() => navigate(`/Program/${project.id}`)}
                      >
                        {project.name} Next Due Date: {project.end_date}
                      </h3>
                      {user.is_pm && (
                        <Button
                          sx={{ m: 1 }}
                          variant='contained'
                          onClick={() => deleteItem(project.id)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </Card>
      </Container>
    </>
  )
}
