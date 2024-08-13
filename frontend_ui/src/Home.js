import './App.css';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  Checkbox
} from "@mui/material";

export default function YourHome(){
  const Username = "Gabagool"
  const navigate = useNavigate();

  const [ data, setData ] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/projects/")
    .then(res => res.json())
    .then(data => setData(data.projects));
  }, [])


  return (
    <>
      <Container fixed maxWidth="lg">
        <Card>
          <CardContent>
            <h1> Welcome, {Username}! These are your available projects.</h1>
            <Button sx={{ m: 1 }} variant="contained" type="submit" onClick={() => navigate("/CreateProgram")}>Create Program</Button>
            <Button sx={{ m: 1 }} variant="contained" type="submit" onClick={() => navigate("/")}>Logout</Button>
          </CardContent>
          <Card>
            <CardContent>
              <div>
                <h2>Projectgrams</h2>
                  {data.map(project => (
                      <h3 className="project" key={project.id} onClick={() => navigate(`/Program/${project.id}`)}>{project.name} Next Due Date: {project.end_date}</h3>
                  ))}
              </div>
            </CardContent>
          </Card>
        </Card>
      </Container>
    </>
  )
}