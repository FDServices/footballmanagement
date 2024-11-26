
import React from 'react'
import {NavBar} from '../components'
import { TextField, Button, Box, Typography, Container, Stack, InputAdornment, IconButton } from '@mui/material';

const Film = () => {
  return (
    <Box sx={{  height: '100vh', bgcolor: 'black',  display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor:'black' }}>
    <NavBar />
    <Stack direction="row" sx={{ width: '90%', height: '100%', backgroundColor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography>Film</Typography>
    </Stack>
  </Box>
  )
}

export default Film