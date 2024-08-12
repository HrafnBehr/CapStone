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
                <h2>Projects</h2>
                <p>Project 1<Button sx={{ m: 1 }} variant="contained" type="submit">Delete</Button></p>
                <p>Project 2<Button sx={{ m: 1 }} variant="contained" type="submit">Delete</Button></p>
                <p>Project 3<Button sx={{ m: 1 }} variant="contained" type="submit">Delete</Button></p>
              </div>
            </CardContent>
          </Card>
        </Card>
      </Container>
    </>
  )
}