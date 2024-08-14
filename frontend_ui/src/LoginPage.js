import './App.css';
import { useState } from 'react';
import { useAuth } from '../src/AuthMaker.js'
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
  const navigate = useNavigate();
  let [username, seUsername]= useState('');
  let [password, setPassword]= useState('');
  // const { login } = useAuth();

  const handleLogin = async(e) => {
    e.preventDefault();

    try{
      const response = await fetch(`http://localhost:8080/login`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'},
          body:JSON.stringify({username, password}),
        })

        if (!response.ok){
          throw new Error('Invalid login credentials');
        }

        const data = await response.json()
        // login(data.token, { username: data.username});
        navigate('/Home')
      } catch (error){
        console.erro("Unable to log you in...")
      }
    }

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