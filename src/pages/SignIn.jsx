import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Container, Stack, InputAdornment, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginUser,getPlayers, deletePlayer, createPlayer, updatePlayer, getCoach, updateCoach, getUser, getLoggedInUser } from '../Api';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = ({loggedInID, setLoggedInID}) => {
  const [players, setPlayers] = useState([])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const playersData = await getPlayers();
        setPlayers(playersData);
       
      } catch (err) {
        setError('Failed to fetch players');
      }
    };


    fetchPlayers()
  }, [])

  const fetchUsers = async () => {
    try {
      const user = getLoggedInUser();
      console.log('Logged-in user:', user);
      setLoggedInID(user)
      
    } catch (error) {
      console.error('Error fetching logged-in user:', error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await loginUser({ username, password });
      console.log(response)
      if (response && response.token) {
        fetchUsers();
        localStorage.setItem('token', response.token); // Store JWT token in local storage
        localStorage.setItem('role', response.role); // Store user role

        if (response.role === 'Coach') {
          navigate('/HCoachDash'); // Redirect to coach dashboard
        } else if (response.role === 'Player') {
          
          navigate('/PlayerDash'); // Redirect to player dashboard
        }
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Invalid username or password');
      console.error(err);
    }
  };
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <Box sx={{  height: '100vh', bgcolor: 'black',  display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor:'black' }}>
    
      {/* section 2 */}
      <Box sx={{ zIndex:'10',boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)', width:'100%', height:'100%', background: 'linear-gradient(135deg, #121212 25%, #1a1a1a 75%)', backgroundColor:'black',display:'flex', alignItems: 'center', justifyContent: 'center', flexDirection:'column' }}>
      <Box sx={{backgroundColor: '#4B0101',padding: '30px',borderRadius: '10px',transition: 'transform 0.3s ease, box-shadow 0.3s ease','&:hover': {transform: 'scale(1.02)', boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.4)', }}}>
        <Typography variant="h2" component="h1" gutterBottom  align="center" sx={{ color: '#B2B2B2' , fontWeight:'900'}} >
          Football Manager
        </Typography>
        <Typography variant="h4"  align="center" sx={{ color: '#B2B2B2' }} >
          Login
        </Typography>
        {error && <Typography color="error" align="center">{error}</Typography>}

        <Stack component="form" onSubmit={handleSubmit} sx={{ mt: 2, flexDirection:'column',alignItems: 'center', justifyContent: 'center', width:'100%'}}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            InputLabelProps={{ style: { color: '#B2B2B2' } }}
            sx={{ 
                '& .MuiOutlinedInput-root': { 
                  '& fieldset': { borderColor: '#B2B2B2' },
                  '&:hover fieldset': {
                      borderColor: '#FFFFFF', 
                  },
                  '& input': {
                      color: '#FFFFFF', 
                  }
                }, width:'50%',
                
              }}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputLabelProps={{ style: { color: '#B2B2B2' } }}
            InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? (
                        <VisibilityOff sx={{ color: '#FFFFFF' }} /> 
                      ) : (
                        <Visibility sx={{ color: '#FFFFFF' }} /> 
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            sx={{ 
              '& .MuiOutlinedInput-root': { 
                '& fieldset': { borderColor: '#B2B2B2' },
                '&:hover fieldset': {
                    borderColor: '#FFFFFF', // Border color on hover
                },
                '& input': {
                    color: '#FFFFFF', // Change input text color to white
                }
              }, width:'50%',
              
            }}
          />
          <Button variant="contained" color="primary" fullWidth  type="submit" 
            sx={{ 
              mt: 2, 
              bgcolor: '#B2B2B2', width:'12%',color:'black',
              '&:hover': { bgcolor: '#8A2A54', }}}>
            Login
          </Button>
        </Stack>
        </Box>
      </Box>

      
    </Box>
  );
};

export default Login;
