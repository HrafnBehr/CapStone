import './LoginPage.css';
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
  Typography,
  Divider,
} from "@mui/material";

export default function Login() {
  const navigate = useNavigate();
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid login credentials');
      }

      const data = await response.json();
      navigate('/Home');
    } catch (error) {
      console.error("Unable to log you in...");
    }
  }

  return (
    <div className="container">
      <div className="card-container">
        <div className="left-section">
          <h1>Login to Your Account</h1>
          <p>Login with government credentials</p>
          <Stack direction="row" spacing={2} justifyContent="center" className="input-field">
            <Button variant="outlined" className="outlined-button">
              CAC
            </Button>
          </Stack>
          <Divider className="divider">OR</Divider>
          <form onSubmit={handleLogin} style={{ marginTop: '20px' }}>
            <Stack spacing={2}>
              <TextField
                id="username"
                label="Email"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                className="input-field"
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                className="input-field"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remember Me"
                className="checkbox-label"
              />
              <Button type="submit" variant="contained" className="button">
                Sign In
              </Button>
            </Stack>
          </form>
        </div>
        <div className="right-section">
          <h2>New Here?</h2>
          <p>Sign up and discover a great amount of new opportunities!</p>
          <Button variant="outlined" onClick={() => navigate("/CreateAccount")} className="outlined-button">
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}

