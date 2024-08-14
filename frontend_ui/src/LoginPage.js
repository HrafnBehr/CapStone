import './LoginPage.css';
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
  Checkbox,
  Typography,
  Divider,
} from "@mui/material";

export default function Login(){
  const navigate = useNavigate();
  let [username, setUsername]= useState('');
  let [password, setPassword]= useState('');
  // const { login } = useAuth();

  const handleLogin = async(e) => {
    e.preventDefault();

    try{
      const response = await fetch(`http://localhost:8080/api/v1/auth/login`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'},
          body:JSON.stringify({username, password}),
        })

        if (!response.ok){
          throw new Error('Invalid login credentials');
        }
        else {
          navigate('/Home')
        }

      } catch (error){
        console.log(error)
        console.error("Unable to log you in...")
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
                        id="username-login"
                        label="Username"
                        variant="outlined"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </FormControl>
                    <FormControl>
                    <TextField sx={{ m: 1 }}
                        id="username-password"
                        type="password"
                        label="Password"
                        variant="outlined"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </FormControl>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Remember Me" />
                    <Button sx={{ mt: 1 }} variant="contained" type="submit" onClick={handleLogin}>Login</Button>
                    <Button sx={{ mt: 1 }} variant="outlined" type="submit" onClick={() => navigate("/CreateAccount")}>Create Account</Button>
                  </Stack>
                </form>
              </CardContent>
            </Card>
          </Container>
        </>
    )
}
