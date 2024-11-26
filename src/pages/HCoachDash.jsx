
import React, { useState,useEffect } from 'react';
import { TextField, Button, Box, Typography, Container, Stack, InputAdornment, IconButton, CardActionArea } from '@mui/material';
import {NavBar} from '../components'
const HCoachDash = () => {

  const [timeSlots, setTimeSlots] = useState(['6:00 AM',  '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
    '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM',])
  
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

  const [schedule, setSchedule] = useState({
    Name: 'this week',
    Type:'Weekly',
    Time:'',
    Monday: { timeSlots, event: [{title:'Testing',description:'ya know?',time:'8:00 AM'}] },
    Tuesday: { timeSlots, event: [] },
    Wednesday: { timeSlots, event: [] },
    Thursday: { timeSlots, event: [] },
    Friday: { timeSlots, event: [] },
    Saturday: { timeSlots, event: [{title:'Morning Football',description:'check attendence',time:'6:00 AM'}, {title:'Prep for Practice',description:'Grab playbook',time:'3:00 PM'}] },
  });


  return (
    <Box sx={{  height: '100vh', bgcolor: 'black',  display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor:'black' }}>
      {/* Stylish Image */}
     <NavBar />

      {/* section 2 */}
      <Stack direction="row" sx={{ width: '90%', height: '100%', backgroundColor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ height: '100%', width: '50%', borderRight: '2px solid white', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
        <Box sx={{ backgroundColor: '#4B0101', padding: '10px', mt: '10px', borderRadius: '10px', width: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Stack>
            <Typography variant="h4" sx={{ color: 'white' }}>Today's Schedule</Typography>
            <Stack sx={{width:'100%', height:'500px',background:'white', overflowY:'scroll'}}> 
              {
                timeSlots.map((time)=>(
                  <CardActionArea
                  sx={{ width: '100%', height: '50px', border: '1px solid black' }}>
                    <Typography>{time} - {schedule['Saturday'].event.find(event=>event.time === time)?.title}</Typography>
                  </CardActionArea>
                ))
              }
            </Stack>
            </Stack>
        </Box>
      </Box>
      <Box sx={{ height: '100%', width: '50%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ height: '40%', width: '100%', borderBottom: '2px solid white', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
          <Box sx={{ backgroundColor: '#4B0101', padding: '10px', mt: '10px', borderRadius: '10px', width: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h4" sx={{ color: 'white' }}>Top Players</Typography>
          </Box>
      </Box>
      <Box sx={{ height: '60%', width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
        <Box sx={{ backgroundColor: '#4B0101', padding: '10px', mt: '10px', borderRadius: '10px', width: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h4" sx={{ color: 'white' }}>Important Tasks</Typography>
        </Box>
      </Box>
        </Box>
      </Stack>


      
    </Box>
  )
}

export default HCoachDash