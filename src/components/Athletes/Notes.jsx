import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, Modal } from '@mui/material';
import PNavBar from '../PNavBar';
import { getPlayers, updatePlayer,getLoggedInUser } from '../../Api';

const Notes = ({ loggedInID, setLoggedInID }) => {
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [messageAddValue, setMessageAddValue] = useState('');
  const [messageAddVis, setMessageAddVis] = useState(false);
  const [error, setError] = useState(null);

  const handleOpen = () => setMessageAddVis(true);
  const handleClose = () => setMessageAddVis(false);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const playersData = await getPlayers();
        setPlayers(playersData);
        
        const player = playersData.find(p => p.userid === loggedInID.userid);
        console.log(playersData)
        setCurrentPlayer(player); // Handle no matching player case
      } catch (err) {
        setError('Failed to fetch players');
      }
    };

    fetchPlayers();
  }, [loggedInID]);

  useEffect(() => {
    fetchUsers()
    console.log(loggedInID)
  }, []);
  
  const fetchUsers = async () => {
    try {
      const user = getLoggedInUser();
      console.log('Logged-in user:', user);
      setLoggedInID(user)
      console.log(user)
    } catch (error) {
      console.error('Error fetching logged-in user:', error.message);
    }
  };

  const handleUpdate = async (player, newNote) => {
    try {
      await updatePlayer(player._id, {
        ...player,
        notes: [...player.notes, newNote],
      });
      const updatedPlayers = await getPlayers();
      setPlayers(updatedPlayers);
      setCurrentPlayer(updatedPlayers.find(p => p.userid === loggedInID.userid));
    } catch (err) {
      setError('Failed to update player');
    }
  };

  const handleDel = async (player, noteToDelete, index) => {
    try {
      const updatedNotes = [...player.notes];
      updatedNotes.splice(index, 1);
      await updatePlayer(player._id, { ...player, notes: updatedNotes });
      const updatedPlayers = await getPlayers();
      setPlayers(updatedPlayers);
      setCurrentPlayer(updatedPlayers.find(p => p.userid === loggedInID.userid));
    } catch (err) {
      setError('Failed to update player');
    }
  };

  return (
    <Box sx={{ height: '100vh', width: '100vw', backgroundColor: 'black', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ height: '90%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant='h3' sx={{ color: 'white', mt: '3%', mb: '5%' }}>
            {currentPlayer ? `${currentPlayer.name}'s Notes` : 'No Player Selected'}
          </Typography>
        </Box>
        {currentPlayer ? (
          <Box sx={{ mb: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Box sx={{ backgroundColor: 'white', width: '80%', padding: '10px', borderRadius: '10px' }}>
              {currentPlayer.notes && currentPlayer.notes.length > 0 ? (
                currentPlayer.notes.map((item, noteIndex) => (
                  <Button key={noteIndex} onClick={() => handleDel(currentPlayer, item, noteIndex)} sx={{ width: '100%' }}>
                    <Box sx={{ width: '100%', backgroundColor: '#4B0101', mb: '5px', mt: '5px', padding: '10px', borderRadius: '10px' }}>
                      <Typography sx={{ color: 'white', textAlign: 'center' }}>{item}</Typography>
                    </Box>
                  </Button>
                ))
              ) : (
                <Typography sx={{ color: 'white' }}>No Notes To Show</Typography>
              )}
            </Box>
          </Box>
        ) : (
          <Typography sx={{ color: 'white' }}>No Players Available</Typography>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#4B0101', width: '15%', height: '8%', borderRadius: '10px', margin: 'auto' }}>
          <Button onClick={handleOpen}>
            <Typography sx={{ color: 'white' }}>Add Note</Typography>
          </Button>
        </Box>
      </Box>
      <Box sx={{ height: '10%' }}>
        <PNavBar />
      </Box>

      <Modal open={messageAddVis} onClose={handleClose} aria-labelledby="message-modal-title" aria-describedby="message-modal-description">
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#4B0101', color: 'white', padding: '20px', borderRadius: '8px', width: '400px', boxShadow: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Typography id="message-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center' }}>Add new note</Typography>
          <Box sx={{ width: '100%', height: '30%', backgroundColor: 'grey', padding: '15px', borderRadius: '8px', marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <TextField onChange={(e) => setMessageAddValue(e.target.value)} sx={{ backgroundColor: 'white', width: '100%', borderRadius: '10px' }} />
          </Box>
          <Button
            onClick={() => {
              handleClose();
              handleUpdate(currentPlayer, messageAddValue);
            }}
            sx={{ marginTop: '15px', backgroundColor: 'grey', color: 'black', '&:hover': { backgroundColor: 'lightgrey' } }}
          >
            Submit Message
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Notes;
