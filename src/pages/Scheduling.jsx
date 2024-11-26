import React, { useState, useEffect } from 'react';
import { NavBar } from '../components';
import { TextField, Button, Box, Typography, Stack } from '@mui/material';
import WeeklyPlanner from '../components/organizational/WeeklyPlanner';
import { getSchedule } from '../Api';

const Scheduling = () => {
  const [error, setError] = useState(null);
  const [open, setOpen] = useState('select');
  const [schedules, setSchedules] = useState([]);
  const [scheduleName, setScheduleName] = useState('');

  const scheduleData1 = {
    Name: 'testing',
    Type: 'weekly',
    Time: '',
    Monday: { 
      timeSlots: [
        '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
        '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
        '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM',
      ], 
      event: [{ Title: 'Testing', Description: 'this is a test', Time: '11:00 AM' }]
    },
    Tuesday: { 
      timeSlots: [
        '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
        '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
        '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM',
      ], 
      event: [{ Title: 'Testing', Description: 'this is a test', Time: '11:00 AM' }]
    },
    Wednesday: { 
      timeSlots: [
        '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
        '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
        '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM',
      ], 
      event: [{ Title: 'Testing', Description: 'this is a test', Time: '11:00 AM' }]
    },
    Thursday: { 
      timeSlots: [
        '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
        '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
        '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM',
      ], 
      event: [{ Title: 'Testing', Description: 'this is a test', Time: '11:00 AM' }]
    },
    Friday: { 
      timeSlots: [
        '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
        '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
        '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM',
      ], 
      event: [{ Title: 'Testing', Description: 'this is a test', Time: '11:00 AM' }]
    },
    Saturday: { 
      timeSlots: [
        '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
        '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
        '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM',
      ], 
      event: [{ Title: 'Testing', Description: 'this is a test', Time: '11:00 AM' }]
    },
  };
  
  const scheduleData2 = {
    Name: 'testing 2',
    Type: 'practice',
    Time: '',
    Monday: { 
      timeSlots: [
        '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
        '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
        '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM',
      ], 
      event: [{ Title: 'NewEvents', Description: 'this is a test', Time: '11:00 AM' }]
    },
    Tuesday: { 
      timeSlots: [
        '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
        '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
        '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM',
      ], 
      event: [{ Title: 'NewEvents2', Description: 'this is a test', Time: '11:00 AM' }]
    },
    Wednesday: { 
      timeSlots: [
        '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
        '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
        '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM',
      ], 
      event: [{ Title: 'NewEvents', Description: 'this is a test', Time: '11:00 AM' }]
    },
    Thursday: { 
      timeSlots: [
        '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
        '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
        '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM',
      ], 
      event: [{ Title: 'Testing', Description: 'this is a test', Time: '11:00 AM' }]
    },
    Friday: { 
      timeSlots: [
        '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
        '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
        '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM',
      ], 
      event: [{ Title: 'Testing', Description: 'this is a test', Time: '11:00 AM' }]
    },
    Saturday: { 
      timeSlots: [
        '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
        '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
        '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM',
      ], 
      event: [{ Title: 'Testing', Description: 'this is a test', Time: '11:00 AM' }]
    },
  };
  
  const [savedSchedule, setSavedSchedule] = useState(null)

  
  useEffect(() => {
    const combinedSchedules = [scheduleData1, scheduleData2];
    setSchedules(combinedSchedules);
  }, []);

  const handleSaveSchedule = (newSchedule) => {
    const updatedSchedules = [...schedules, { name: scheduleName, schedule: newSchedule }];
    setSchedules(updatedSchedules);
    localStorage.setItem('savedSchedules', JSON.stringify(updatedSchedules));
    setScheduleName('');
    setOpen('select');
  };

  const handleLoadSchedule = (scheduleName) => {
    const selectedSchedule = schedules.find(schedule => schedule.name === scheduleName);
    if (selectedSchedule) {
      // Load the selected schedule into the app (can pass this to WeeklyPlanner component)
      console.log('Loaded Schedule:', selectedSchedule.schedule);
      // You can set this schedule to state or use it for further editing
    }
  };

  return (
    <Box sx={{ height: '100vh', bgcolor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <NavBar />
      <Stack sx={{ width: '90%', height: '100%', backgroundColor: 'black', display: 'flex', alignItems: 'top', justifyContent: 'top' }}>
        {open === 'select' && (
          <Box sx={{}}>
            <Typography textAlign={'center'} variant='h3' color='white' sx={{fontWeight:'900', mt:'20px'}}>Scheduling</Typography>
            <Stack direction='row' sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', m:'10px', padding:'20px' }}>
              <Button sx={{color:'white', backgroundColor:'#4B0101', padding:'25px', mr:'20px'}} onClick={() => { setOpen('new practice'); }}>New Practice Schedule</Button>
              <Button sx={{color:'white', backgroundColor:'#4B0101', padding:'25px'}} onClick={() => { setOpen('new weekly'); }}>New Weekly Schedule</Button>
             
            </Stack>
          </Box>
        )}

        {open === 'new weekly' && (
          <Stack direction={'row'} sx={{ width: '100%', }}>
            <WeeklyPlanner name={scheduleName} type={'weekly'} savedSchedule={savedSchedule} />
            <Stack sx={{ background: 'white', ml: '15px', borderRadius: '5px',display: 'flex', alignItems: 'center', justifyContent: 'top',padding:'10px' }}>
              <TextField
                label='Name'
                value={scheduleName}
                onChange={(e) => setScheduleName(e.target.value)}
                fullWidth
                sx={{margin:'0px'}}
              />
              <Button sx={{ width:'80%', mt:'10px', mb: '10px', backgroundColor: '#4B0101', padding: '10px 20px', color: 'white', '&:hover': { backgroundColor: '#4B0101', opacity: 0.8 }, '&:active': { backgroundColor: '#4B0101' }, transition: 'all 0.3s ease' }} onClick={() => handleSaveSchedule()}>Save</Button>
              <Button sx={{ width:'80%',   mb: '10px',backgroundColor: '#4B0101', padding: '10px 20px', color: 'white', '&:hover': { backgroundColor: '#4B0101', opacity: 0.8 }, '&:active': { backgroundColor: '#4B0101' }, transition: 'all 0.3s ease'  }} onClick={() => setOpen('select')}>Go Back</Button>
              <Stack>
              { schedules.length>0 &&
                schedules.filter((schedule)=>(schedule.Type === 'weekly')).map((schedule, index) => {
                  return (
                    <Button sx={{  backgroundColor: '#4B0101', padding: '10px 20px', color: 'white', '&:hover': { backgroundColor: '#4B0101', opacity: 0.8 }, '&:active': { backgroundColor: '#4B0101' },  transition: 'all 0.3s ease'  }} key={index} onClick={()=>{setSavedSchedule(schedule)}}>
                      {schedule.Name}
                    </Button>
                  )
                })}

            </Stack>
            </Stack>
          </Stack>
        )}

        {open === 'new practice' && (
          <Stack direction={'row'} sx={{ width: '100%', }}>
            <WeeklyPlanner name={scheduleName} type={'practice'} handleSaveSchedule={handleSaveSchedule} />
            <Stack sx={{ background: 'white', ml: '15px', borderRadius: '5px',display: 'flex', alignItems: 'center', justifyContent: 'top',padding:'10px'  }}>
              <TextField
                label='Name'
                value={scheduleName}
                onChange={(e) => setScheduleName(e.target.value)}
                fullWidth
              />
              <Button sx={{ width:'80%', mt:'10px', mb: '10px', backgroundColor: '#4B0101', padding: '10px 20px', color: 'white', '&:hover': { backgroundColor: '#4B0101', opacity: 0.8 }, '&:active': { backgroundColor: '#4B0101' }, transition: 'all 0.3s ease' }} onClick={() => handleSaveSchedule()}>Save</Button>
              <Button sx={{ width:'80%', mt:'10px', mb: '10px', backgroundColor: '#4B0101', padding: '10px 20px', color: 'white', '&:hover': { backgroundColor: '#4B0101', opacity: 0.8 }, '&:active': { backgroundColor: '#4B0101' }, transition: 'all 0.3s ease' }} onClick={() => setOpen('select')}>Go Back</Button>
              <Stack>
              { schedules.length>0 &&
                schedules.filter((schedule)=>(schedule.Type === 'practice')).map((schedule, index) => {
                  return (
                    <Button sx={{ width:'100%', mt:'10px', mb: '10px', backgroundColor: '#4B0101', padding: '10px 20px', color: 'white', '&:hover': { backgroundColor: '#4B0101', opacity: 0.8 }, '&:active': { backgroundColor: '#4B0101' }, transition: 'all 0.3s ease' }} key={index} onClick={()=>{setSavedSchedule(schedule)}}>
                      {schedule.Name}
                    </Button>
                  )
                })}

            </Stack>
            </Stack>
          </Stack>
        )}

        
      </Stack>
    </Box>
  );
};

export default Scheduling;
