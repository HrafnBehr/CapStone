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
  const navigate = useNavigate();

  return (
    <>
      <Container fixed maxWidth="sm">
            <Card>
              <CardContent>
                <h1>Create A Program</h1>

                <form>
                  <Stack>
                    <FormControl>
                      <TextField sx={{ m: 1 }}
                        id="outlined-basic"
                        label="Program Name"
                        variant="outlined"
                      />
                    </FormControl>

                    <FormControl>
                      <TextField sx={{ m: 1 }}
                        id="outlined-basic"
                        label="Program Description"
                        variant="outlined"
                        multiline
                        rows={5}
                      />
                    </FormControl>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker sx={{ m: 1 }} label = "Start Date" />
                    </LocalizationProvider>

                    <LocalizationProvider  dateAdapter={AdapterDayjs}>
                      <DatePicker sx={{ m: 1 }} label = "End Date" />
                    </LocalizationProvider>

                    <Button sx={{ mt: 1 }} variant="contained" type="submit" onClick={() => navigate("/Home")}>Create</Button>
                    <Button sx={{ mt: 1 }} variant="outlined" type="submit" onClick={() => navigate("/Home")}>Cancel</Button>
                  </Stack>
                </form>
              </CardContent>
            </Card>
          </Container>
    </>
  )
}