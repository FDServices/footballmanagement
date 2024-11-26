import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Stack, InputAdornment, IconButton } from '@mui/material';
import {PNavBar} from '../components'

const PlayerDash = () => {

    
  return (
    <Box sx={{ height: '100vh', width: '100vw', backgroundColor: 'black', display: 'flex', flexDirection: 'column' }}>
    <Box sx={{ height: '90%' }}>
        <Box sx={{backgroundColor:'#4B0101', padding:'20px'}}> 
            <Typography  variant='h5' sx={{color:'white', textAlign:'center'}}> Reminders from Coach </Typography> 
        </Box>
        <Box sx={{backgroundColor:'#4B0101', padding:'20px'}}>
             <Typography variant='h5' sx={{color:'white', textAlign:'center'}}> Practices and Workouts Today </Typography> 
        </Box>
        <Box sx={{backgroundColor:'#4B0101', padding:'20px'}}> 
            <Typography variant='h5'sx={{color:'white', textAlign:'center'}}> Performances </Typography>
        </Box>
       
    </Box>
    <Box sx={{ height:'10%' }}>
        <PNavBar />
    </Box>
</Box>

  )
}

export default PlayerDash