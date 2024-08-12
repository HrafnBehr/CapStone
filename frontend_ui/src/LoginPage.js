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
} from "@mui/material";



export default function Login(){
    return (
        <>
          <Container fixed maxWidth="sm">
            <Card>
              <CardContent>
                <form>
                  <Stack>
                    <FormControl>
                      <TextField
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        value="Username"
                      />
                    </FormControl>
                    <FormControl sx={{ mt: 1 }}>
                      <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        value="Password"
                      />
                    </FormControl>
                    <Button sx={{ mt: 1 }} variant="contained" type="submit">Login</Button>
                  </Stack>
                </form>
              </CardContent>
            </Card>
          </Container>
        </>
    )
}