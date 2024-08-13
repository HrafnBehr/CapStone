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
  Checkbox
} from "@mui/material";



export default function Login(){
  const navigate =useNavigate();
  let [username, seUsername]= useState('');
  let [password, setPassword]= useState('');

    return (
        <>
          <Container fixed maxWidth="sm">
            <Card>
              <CardContent>
                <h1>Login</h1>
                <form>
                  <Stack>
                    <FormControl>
                    <TextField sx={{ m: 1 }}
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                      />
                    </FormControl>
                    <FormControl>
                    <TextField sx={{ m: 1 }}
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                      />
                    </FormControl>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Remember Me" />
                    <Button sx={{ mt: 1 }} variant="contained" type="submit" onClick={() => navigate("/Home")}>Login</Button>
                    <Button sx={{ mt: 1 }} variant="outlined" type="submit" onClick={() => navigate("/CreateAccount")}>Create Account</Button>
                  </Stack>
                </form>
              </CardContent>
            </Card>
          </Container>
        </>
    )
}