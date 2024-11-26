import React, { useEffect, useState, useRef } from 'react';
import {NavBar} from '../components';
import { getPlayers, deletePlayer, createPlayer, updatePlayer, getCoach, updateCoach } from '../Api';
import { TextField, Button, Box, Typography, Stack,Grid, Modal, List, ListItem, Checkbox, ListItemText } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Roster = () => {

  const coachDropDownRef = useRef();
  const [dropDown, setDropDown] = useState(false)
  const [dropDownVal, setDropDownVal] = useState('')

  const [coach, setCoach] = useState([]);
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState('');
  const [newPosition, setNewPosition] = useState('');
  const [newHeight, setNewHeight] = useState('');
  const [newWeight, setNewWeight] = useState('');
  const [newPlayer, setNewPlayer] = useState({ name: '', position: '', height: '' });
  const [playerCoach, setPlayerCoach] = useState('');
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [addToCoachVis, setAddToCoachVis] = useState(false);
  const [addPlayerCoachID, setAddPlayerCoachID] = useState(null)

  const [tempCoaches, setTempCoaches] = useState([
    { name: 'Coach BRan', players: ['Player 1', 'Player 2'], vis:false },
    { name: 'Coach COlt', players: ['Player 3', 'Player 4'], vis:false  },
    { name: 'Coach Mas', players: ['Player 5', 'Player 6'], vis:false  }
  ]);
  // for dropdown dude
  useEffect(() => {
    function handleClickOutside(event) {
      if (coachDropDownRef.current && !coachDropDownRef.current.contains(event.target)) {
        setDropDown(false); 
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); 



  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const playersData = await getPlayers();
        setPlayers(playersData);
      } catch (err) {
        setError('Failed to fetch players');
      }
    };
  
    const fetchCoach = async () => {
      try {
        const coachData = await getCoach();
        setCoach(coachData);
      } catch (err) {
        setError('Failed to fetch coaches');
      }
    };
  
    fetchPlayers();
    fetchCoach();
  }, [refreshKey]); // Re-run when refreshKey changes
  

  
  
  
  const handleDelete = async (id) => {
    try {
      await deletePlayer(id);
      setPlayers(players.filter(player => player._id !== id));
    } catch (err) {
      setError('Failed to delete player');
    }
  };

  const handleEdit = (player) => {
    console.log(player)
    setEditingId(player._id);
    setNewName(player.name);
    setNewPosition(player.position);
    setNewHeight(player.height);
    setNewWeight(player.weight);
    setPlayerCoach(coach.player)
    
  };
  

  const handleUpdate = async () => {
    try {
      await updatePlayer(editingId, { name: newName, position: newPosition, height: newHeight, weight: newWeight });
      setPlayers(players.map(player => 
        player._id === editingId ? { ...player, name: newName, position: newPosition, height: newHeight, weight: newWeight } : player
      ));
      setEditingId(null);
      setNewName('');
      setNewPosition('');
      setNewHeight('');
      setNewWeight('');
    } catch (err) {
      setError('Failed to update player');
    }
  };

  const handleCreatePlayer = async (e) => {
    e.preventDefault();
    try {
      const newPlayerData = await createPlayer(newPlayer);
      setPlayers([...players, newPlayerData]);
      setNewPlayer({ name: '', position: '', height: '', weight: '' });
      setIsAddFormVisible(false); 
    } catch (err) {
      setError('Failed to create player');
    }
  };

  if (error) return <div>{error}</div>;

  const handleCoachDropDown = (selectedCoach) => {
    setTempCoaches((prevCoaches) =>
      prevCoaches.map((coach) =>
        coach.name === selectedCoach.name
          ? { ...coach, vis: !coach.vis }
          : coach
      )
    );
  };

  const handleShowAllClick = () => {
    console.log(coach)
    setDropDown(prevState => !prevState);
    setDropDownVal('')
  }

 


  const handlePlayerListClick = (coachName) => {
    console.log(coachName)
    setAddPlayerCoachID(coachName)
    setAddToCoachVis(prevState => !prevState);
  };

  const handleAddPlayer = async (selected) => {
    try {
      await updateCoach(addPlayerCoachID._id, {
        name: addPlayerCoachID.name,
        player: [...addPlayerCoachID.player, selected.name],
      });
  
      // Trigger re-fetch
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (err) {
      setError('Failed to update coach');
    }
  };
  
  const handleDelPlayer = async (coachName, selected) => {
    try {
      await updateCoach(coachName._id, {
        name: coachName.name,
        player: coachName.player.filter((item) => item !== selected),
      });
  
      // Trigger re-fetch
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (err) {
      setError('Failed to update coach');
    }
  };
  

  return (
    <Box sx={{ height: '100vh', bgcolor: 'black' }}>
      <Stack direction='row' sx={{height:'100vh'}}>
      <NavBar />
      {/* Add button */}
      <Box sx={{ height: '100%', width:'100%', bgcolor: 'black', display: 'flex', flexDirection: 'column',padding:'20px'  }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{ color: 'white' }}>Roster</h2>
          <Button 
            variant="contained" 
            onClick={() => setIsAddFormVisible(!isAddFormVisible)}
            sx={{ 
              color: 'white', 
              backgroundColor: 'maroon', 
              borderRadius: '50%', 
              minWidth: '40px', 
              height: '40px', 
              padding: '0',
              margin: '0 10px'
            }}
          >
            +
          </Button>
        </div>
          
          {/* Add player form section */}
          {isAddFormVisible && (
            <Modal open={isAddFormVisible} onClose={() => setIsAddFormVisible(false)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ maxWidth: '400px', padding: '16px', bgcolor: 'maroon', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginBottom: '20px' }}>
                <Typography variant="h5" sx={{ color: 'white', marginBottom: '16px' }}>Add New Player</Typography>
                <form onSubmit={handleCreatePlayer} style={{ width: '100%' }}>
                  <TextField label="Player Name" variant="outlined" fullWidth margin="normal" value={newPlayer.name} onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })} sx={{ bgcolor: 'white' }} required />
                  <TextField label="Position" variant="outlined" fullWidth margin="normal" value={newPlayer.position} onChange={(e) => setNewPlayer({ ...newPlayer, position: e.target.value })} sx={{ bgcolor: 'white' }} required />
                  <TextField label="Height" variant="outlined" fullWidth margin="normal" value={newPlayer.height} onChange={(e) => setNewPlayer({ ...newPlayer, height: e.target.value })} sx={{ bgcolor: 'white' }} required />
                  <TextField label="Weight" variant="outlined" fullWidth margin="normal" value={newPlayer.weight} onChange={(e) => setNewPlayer({ ...newPlayer, weight: e.target.value })} sx={{ bgcolor: 'white' }} required />
                  <Button type="submit" variant="contained" color="primary" fullWidth>Add Player</Button>
                </form>
              </Box>
            </Modal>
          )}

      <Stack direction='row' sx={{width:'100%'}}>
        <Box sx={{width:'50%'}} >
          <Typography variant='h4' style={{ color: 'white' }}>Players</Typography>
          {players.length > 0 ? (
            <Box >
              {players.map((player) => (
                <Box key={player._id} sx={{backgroundColor:'#4B0101', padding:'20px', borderRadius:'8px', m:'5px', minWidth:'70%', maxWidth:'80%', color:'white'}}>
                  <strong>Name:</strong> {editingId === player._id ? (
                    <span style={{ color: 'green' }}>{newName} (Editing)</span>
                  ) : (
                    <span>{player.name}</span>
                  )} | <strong>Position:</strong> {player.position} | <strong>Height:</strong> {player.height} in | <strong>Weight:</strong> {player.weight} lbs
                  <Box>
                    <Button 
                      onClick={() => handleEdit(player)} 
                      sx={{ color: 'blue', marginLeft: '10px' }}
                    >
                     < EditIcon sx={{color:'white'}} />
                    </Button>
                    <Button 
                      onClick={() => handleDelete(player._id)} 
                      sx={{ color: 'red', marginLeft: '10px' }}
                    >
                     <DeleteIcon sx={{color:'white'}}/>
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <p style={{ color: 'white' }}>No players found.</p>
          )}
        </Box>
          {/* Assistant Coach section */}
          <Box sx={{width:'50%',  display: 'flex', alignItems: 'center', flexDirection:'column'}}>
            <Typography variant='h4' style={{ color: 'white', textAlign:'center' }}>Assistant Coaches</Typography>
              <Box sx={{backgroundColor:'#4B0101 ', width:"100%", height:'100%', borderRadius:'10px',display: 'flex', alignItems: 'center', flexDirection:'column', padding:'20px'}}>
              <Stack direction="row" alignItems="center" justifyContent='center' sx={{ backgroundColor: '#4B0101 ', borderRadius: '8px 8px 8px 8px', border: '2px solid white', padding: '8px 12px', '&:hover': { backgroundColor: '#4B0101 ' } }}>
              <TextField label="Enter Name" onChange={(e) => {setDropDownVal(e.target.value); setDropDown(true)}} value={dropDownVal} variant="outlined" fullWidth sx={{ input: { color: 'white', border: 'none' }, '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, '& .MuiInputLabel-root': { color: 'white' }, '& .MuiInputLabel-root.Mui-focused': { color: 'white' }, '& .MuiInputLabel-root.MuiFormLabel-filled': { color: 'white' } }} />
                  <Button onClick={() => handleShowAllClick()}><KeyboardArrowDownIcon sx={{color:'white'}}/></Button>
              </Stack>
              {dropDown && coach.some(item => item.name.toLowerCase().startsWith(dropDownVal.toLowerCase())) && (
                <Box 
                  ref={coachDropDownRef} 
                  sx={{
                    display: coach.some(item => 
                      item.name.toLowerCase().startsWith(dropDownVal.toLowerCase())
                    ) ? 'block' : 'none', backgroundColor: '#4B0101 ',  border: '2px solid white', borderTop:'none',  borderRadius: '0px 0px 10px 10px',  width: '40%',  zIndex: 1, padding: '5px',  display: 'flex',  justifyContent: 'center', flexDirection: 'column' }} >
                  {coach.length > 0 && dropDown &&
                    coach.filter(item => 
                      item.name.toLowerCase().startsWith(dropDownVal.toLowerCase())
                    ).map((item, idx) => (
                      <Typography
                        key={idx}
                        sx={{ width: '50%', borderBottom: '2px solid white',height: '100%',  textAlign: 'center',  color: 'white',  padding: '4px',  cursor: 'pointer', '&:hover': { backgroundColor: 'grey' }, transition: 'all 0.3s ease', ml: 'auto', mr: 'auto' }} 
                        onClick={() => { 
                          setDropDownVal(item.name); // Set the selected item as the dropdown value
                          setDropDown(false); // Close the dropdown after selection
                        }}>
                        {item.name} {/* Display the 'name' field */}
                        
                      </Typography>
                      
                    ))
                  }
                </Box>
              )}
              {
                coach.some(item => item.name.toLowerCase() === dropDownVal.toLowerCase()) && (
                  <Box sx={{ mt: '10px', backgroundColor: 'maroon', width: '80%', height: '90%', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '20px' }}>
                    <Typography variant='h5' sx={{ color: 'white' }}>
                      Coach {coach.find(item => item.name.toLowerCase() === dropDownVal.toLowerCase())?.name}'s players 
                      <Button onClick={() => handlePlayerListClick(coach.find(item => item.name === dropDownVal))}><EditIcon sx={{color:'white'}} /></Button>
                    </Typography>
                    <Grid container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
                      {coach
                        .filter(item => item.name.toLowerCase() === dropDownVal.toLowerCase()) // Filter to get matching coach items
                        .map((item, idx) => (
                          // Map through item.player to render each player
                          item.player.map((player, playerIdx) => (
                            <Grid item xs={4}>
                              <Typography key={`${idx}-${playerIdx}`} variant='h6' sx={{ color: 'white', mb: '10px' }}>
                                <Stack sx={{flexDirection: 'row', backgroundColor:'grey', padding:'10px', borderRadius:'10px', color:'black' }}>
                                  {player} <Button onClick={() => handleDelPlayer(coach.find(item => item.name === dropDownVal), player)}> <DeleteIcon sx={{color:'black'}} /> </Button>
                                </Stack>
                              </Typography>
                            </Grid>
                          ))
                        ))}
                    </Grid>
                  </Box>
                )
              }
              </Box>
              
          </Box>
        </Stack>

        {editingId && (
        <Modal open={editingId} onClose={() => setEditingId(false)} sx={{ position: 'absolute',top: '10%',  }}>
          <Box sx={{ maxWidth: '400px', margin: 'auto', padding: '16px', bgcolor: 'maroon', borderRadius: '8px', marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" sx={{ color: 'white' }}>Edit Player</Typography>
            <TextField label="Name" variant="outlined" fullWidth margin="normal" value={newName} onChange={(e) => setNewName(e.target.value)} sx={{ bgcolor: 'white' }} required />
            <TextField label="Position" variant="outlined" fullWidth margin="normal" value={newPosition} onChange={(e) => setNewPosition(e.target.value)} sx={{ bgcolor: 'white' }} required />
            <TextField label="Height" variant="outlined" fullWidth margin="normal" value={newHeight} onChange={(e) => setNewHeight(e.target.value)} sx={{ bgcolor: 'white' }} required />
            <TextField label="Weight" variant="outlined" fullWidth margin="normal" value={newWeight} onChange={(e) => setNewWeight(e.target.value)} sx={{ bgcolor: 'white' }} required />
            <Button variant="contained" color="primary" onClick={handleUpdate} fullWidth>Update Player</Button>
          </Box>
        </Modal>
      )}

      {/* Modal for Adding a player to a assistant Coach */}
      {addToCoachVis && (
        <Modal open={addToCoachVis} onClose={() => setAddToCoachVis(false)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ width: '80%', maxWidth: '500px', padding: '16px', bgcolor: 'maroon', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px', boxSizing: 'border-box' }}>
            <Typography variant="h5" sx={{ color: 'white', marginBottom: '16px' }}>Add Player To Selected Assistant Coach</Typography>
            <Box sx={{ width: '100%', flexDirection:'column', display:'flex', justifyContent:'center', alignItems:'center' }}>
            <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ml:'30px'}}>{players.map((player) => (
              <Grid item xs={4} key={player._id}>
                <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: '#4B0101', padding: '5px', borderRadius: '5px', width: '100px', justifyContent: 'center', alignItems: 'center' }}>
                  <Button onClick={() => handleAddPlayer(player)}><Typography sx={{ color: 'white' }}>{player.name}</Typography></Button>
                </Box>
              </Grid>
            ))}</Grid>
            </Box>
          </Box>
        </Modal>
      )}
      {/* Spacer to push Player Entry Form to the bottom */}
        <Box sx={{ flexGrow: 1 }} />
      </Box>
      </Stack>
    </Box>
  );
};

export default Roster;
