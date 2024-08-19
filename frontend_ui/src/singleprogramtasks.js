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

export default function SingleProgramTask() {
  return (
    <>
      <Container>
        <Card>
          <CardContent>
            <Stack>
              <TextField></TextField>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}
