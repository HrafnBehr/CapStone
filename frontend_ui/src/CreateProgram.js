import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


export default function CreateProgram(){
  // enables navigate
  const navigate = useNavigate();
  // our useState block that helps us define our data
  const [programName, setProgramName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [projectDetails, setProjectDetails] = useState({name: "", description: "", start_date: "", end_date: ""})

  // our async addProgram which handles adding a program to the ui by fetching the endpoint data
  const addProgram = async (e) => {
    // prevents default action from being taken unless explicitly done so
    e.preventDefault()

    // variable defining the program data
    //const programToBeMade ={ name, description, sDate, eDate }

    // try hook that leads into our fetch
    try {

      // our fetch reaching out to our data endpoint and what it is communicating
      const response = await fetch('http://localhost:8080/api/v1/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        // turning the data of programToBeMade into string data for the database
        body:JSON.stringify()

      });

      if(!response.ok){
        throw new Error('failed to fulfill your request');
      }

      const result = await response.json();

      // Lines 62-67 contain an alert for successful adding of a program and reset the useStates
      alert('New program added to listing')
      setProgramName('')
      setDescription('')
      setStartDate('')
      setEndDate('')
      navigate("/Home")

      // catch hook for our above try
    } catch (error) {

      // error message for us to quickly identify where our code is skitzing out
      console.error("Error upon adding program: check lines 42-60", error);
    }
  }

  function updateInfo(e) {
    if(e.target.id === "project-name") {
      setProjectDetails({ ...projectDetails, name: e.target.value})
    }
    else if(e.target.id === "project-description") {
      setProjectDetails({ ...projectDetails, description: e.target.value})
    }
    else if(e.target.id === "start_date") {
      setProjectDetails({ ...projectDetails, start_date: e.target.value})
    }
    else {
      setProjectDetails({ ...projectDetails, end_date: e.target.value})
    }
    console.log(projectDetails);
  }

  return (
    <>
      <Container fixed maxWidth="sm">
            <Card>
              <CardContent>
                <h1>Create A Project</h1>

                <form>
                  <Stack>
                    <FormControl>
                      <TextField sx={{ m: 1 }}
                        id="project-name"
                        label="Project Name"
                        variant="outlined"
                        onChange={updateInfo}
                      />
                    </FormControl>

                    <FormControl>
                      <TextField sx={{ m: 1 }}
                        id="project-description"
                        label="Project Description"
                        variant="outlined"
                        multiline
                        rows={5}
                        onChange={updateInfo}
                      />
                    </FormControl>

                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                      <DatePicker sx={{ m: 1 }} label = "Start Date" id="start_date" onChange={updateInfo}/>
                    </LocalizationProvider>

                    <LocalizationProvider  dateAdapter={AdapterDayjs}>
                      <DatePicker sx={{ m: 1 }} label = "End Date" />
                    </LocalizationProvider>

                    <Button sx={{ mt: 1 }} variant="contained" type="submit" onClick={() => navigate("/Home")}>Create</Button>
                    <Button sx={{ mt: 1 }} variant="outlined" type="submit" onClick={() => navigate("/Home")}>Back</Button>
                  </Stack>
                </form>
              </CardContent>
            </Card>
          </Container>
    </>
  )
}