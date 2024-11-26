import React, { useState,useEffect } from 'react';
import { Box, Stack, Typography, Modal, Button, TextField, CardActionArea } from '@mui/material';

// TimeCard Component
const TimeCard = ({ slot, day, event, handleOpen }) => {
  return (
    <CardActionArea
      sx={{ width: '100%', height: '50px', border: '1px solid black' }}
      onClick={() => handleOpen(day, slot, event)}
    >
      {event && <Typography textAlign="center">{`${event.title}: ${slot}`}</Typography>}
    </CardActionArea>
  );
};

// WeeklyPlanner Component
const WeeklyPlanner = ({type,name,savedSchedule}) => {
  const [timeSlots, setTimeSlots] = useState([])


  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const [schedule, setSchedule] = useState({
    Name: name,
    Type:type,
    Time:'',
    Monday: { timeSlots, event: [] },
    Tuesday: { timeSlots, event: [] },
    Wednesday: { timeSlots, event: [] },
    Thursday: { timeSlots, event: [] },
    Friday: { timeSlots, event: [] },
    Saturday: { timeSlots, event: [] },
  });

  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editable, setEditable] = useState(false);
  const [currentDay, setCurrentDay] = useState('');
  const [currentSlot, setCurrentSlot] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');

  const handleOpen = (day, slot, event = null) => {

    setCurrentDay(day);
    setCurrentSlot(slot);
    setSelectedEvent(event);
    setTime(event ? event.time : slot);
    setTitle(event ? event.title : '');
    setDescription(event ? event.description : '');
    setEditable(!event); // Automatically enter edit mode for new events
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
    setTitle('');
    setDescription('');
    setTime('');
    setEditable(false);
  };

  const handleSave = () => {
    const updatedSchedule = { ...schedule };
    const events = updatedSchedule[currentDay].event;

    if (selectedEvent) {
      // Update existing event
      const eventIndex = events.findIndex((e) => e.time === selectedEvent.time);
      events[eventIndex] = { title, description, time };
    } else {
      // Create new event
      events.push({ title, description, time });
    }

    // Sort events by time after saving
    updatedSchedule[currentDay].event = events.sort((a, b) =>
      timeSlots.indexOf(a.time) - timeSlots.indexOf(b.time)
    );

    setSchedule(updatedSchedule);
    handleClose();
  };

  
  useEffect(() => {
    if(savedSchedule){
      console.log(savedSchedule)
      setSchedule(savedSchedule)
      setTimeSlots([...savedSchedule.Monday.timeSlots])
    }
  }, [savedSchedule])

  useEffect(() => {
    if(type === 'weekly'){
      setTimeSlots(['6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
      '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
      '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM',]
)    }else if(type === 'practice'){
      setTimeSlots(['3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
        '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
        '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM',])
    }
  }, [])
  
  

  return (
    <Box sx={{width:'100%', background:'white'}}>
      {
        
        timeSlots.map((slot, idx) => (
        <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-around' }} key={idx}>
          {idx === 0 &&
            days.map((day) => <Typography key={day}>{day}</Typography>)}
          {idx !== 0 && schedule &&
            days.map((day) => (
              <TimeCard
                key={`${day}-${slot}`}
                slot={slot}
                day={day}
                event={savedSchedule ? savedSchedule[day].event.find((e) => e.time === slot) || null : schedule[day].event.find((e) => e.time === slot) || null}
                handleOpen={handleOpen}
              />
            ))}
        </Stack>
      ))}

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            padding: 4,
            boxShadow: 24,
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            {selectedEvent ? 'Edit Event' : 'Create New Event'}
          </Typography>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
            
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default WeeklyPlanner;
