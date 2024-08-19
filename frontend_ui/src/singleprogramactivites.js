import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Container,
  Card,
  TextField,
  Button,
  CardContent,
  Stack,
  FormControl,
  Box,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

export default function SingleProgramAct() {
  const navigate = useNavigate()
  return (
    <>
      <Container>
        <Card>
          <CardContent>
            <Stack>
              <FormControl>
                <TextField
                  sx={{ m: 1 }}
                  id='outlined-basic'
                  label='Program Name'
                  variant='outlined'
                />
              </FormControl>
              <FormControl>
                <TextField
                  sx={{ m: 1 }}
                  id='outlined-basic'
                  label='Program Description'
                  variant='outlined'
                  multiline
                  rows={5}
                />
              </FormControl>
              <FormControl>
                <Box display='flex' justifyContent='space-around'>
                  <Button sx={{ m: 1 }} variant='contained'>
                    Milestone A
                  </Button>
                  <Button sx={{ m: 1 }} variant='contained'>
                    Milestone B
                  </Button>
                  <Button sx={{ m: 1 }} variant='contained'>
                    Milestone C
                  </Button>
                </Box>
              </FormControl>
              <Box display='flex' justifyContent='space-around'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker sx={{ m: 1 }} label='Start Date' />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker sx={{ m: 1 }} label='End Date' />
                </LocalizationProvider>
              </Box>
              <Button sx={{ mt: 1 }} variant='contained' type='submit'>
                Update
              </Button>
              <Button
                sx={{ mt: 1 }}
                variant='outlined'
                onClick={() => navigate('/Home')}
              >
                Back
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}
