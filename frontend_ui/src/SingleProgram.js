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
    Box
  } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import "./SingleProgram.css";




export default function SingleProgram(){
  const navigate = useNavigate();

  return(
    <>
      <Container>
            <Card>
                <CardContent>
                  <h1>Editing ITEM NAME HERE use object literal</h1>
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
                    <Box display= "flex" justifyContent="space-around">
                      <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DatePicker sx={{ m: 1 }} label = "Start Date"/>
                      </LocalizationProvider>

                      <LocalizationProvider  dateAdapter={AdapterDayjs}>
                        <DatePicker sx={{ m: 1 }} label = "End Date"/>
                      </LocalizationProvider>
                    </Box>
                    <Button sx={{ mt: 1 }} variant="contained" onClick={() => navigate("/Home")}>Update</Button>
                    <Button sx={{ mt: 1 }} variant="outlined" onClick={() => navigate("/Home")}>Back</Button>
                    </Stack>
                  </form>
                </CardContent>
            </Card>
        </Container>
    </>
  )
}