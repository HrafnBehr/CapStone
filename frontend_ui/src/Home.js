import './App.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Card, Button, CardContent } from '@mui/material'
import { useAuth } from './hooks/useAuth'

export default function YourHome() {
  const [data, setData] = useState([])
  const [deleteFlag, setDeleteFlag] = useState(false)
  const [firstLoad, setFirstLoad] = useState(true)

  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/projects/')
      .then((res) => res.json())
      .then((data) => {
        setData(data.projects)
        //console.log(data)
      })
  }, [deleteFlag])

  console.log('USER: ', user)

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
      {/* {user ? ( */}
      <Container maxWidth='lg'>
        <Card>
          <CardContent>
            <h1> Welcome, Gabagool! These are your available projects.</h1>
            <Button
              sx={{ m: 1 }}
              variant='contained'
              type='submit'
              onClick={() => navigate('/CreateProgram')}
            >
              Create Program
            </Button>
          </CardContent>
          <Card>
            <CardContent>
              <div>
                <h2>Projectagrams</h2>
                {data.map((project) => (
                  <div key={project.id}>
                    <h3
                      className='project'
                      onClick={() => navigate(`/Program/${project.id}`)}
                    >
                      {project.name} Next Due Date: {project.end_date}
                    </h3>
                    <Button
                      sx={{ m: 1 }}
                      variant='contained'
                      onClick={() => deleteItem(project.id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Card>
      </Container>
      {/* ) : (<p>Please <Link to="/">Login</Link> to view your account</p>)} */}
    </>
  )
}
