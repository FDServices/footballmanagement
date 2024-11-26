import React from 'react'
import { TextField, Button, Box, Typography, Container, Stack, InputAdornment, IconButton } from '@mui/material';
import  PNavBar  from '../PNavBar';

const Sprint_Jump = () => {
  return (
    <Box sx={{ height: '100vh', width: '100vw', backgroundColor: 'black', display: 'flex', flexDirection: 'column' }}>
    <Box sx={{ height: '90%' }}>
      <Typography>Sprints and Jumps Records</Typography>
    </Box>
    <Box sx={{ height:'10%' }}>
        <PNavBar />
    </Box>
  </Box>
  )
}

export default Sprint_Jump