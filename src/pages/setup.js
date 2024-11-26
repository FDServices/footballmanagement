import React, { useState } from 'react';
import { createUser } from '../Api';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useEffect } from 'react';

const Setup = () => {
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    role: 'Player',
  });


  //
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  // Add User
  const handleAddUser = async () => {
    await createUser(newUser);
    setNewUser({ username: '', password: '', role: 'Player' });
  };


  useEffect(() => {
    document.body.style.backgroundColor = '#6B003E';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);
  return (
    <Box sx={{ bgcolor: '#6B003E', color: '#B2B2B2', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        User Setup
      </Typography>

      {/* Add User Section */}
      <Box mb={2}>
        <TextField
          name="username"
          label="Username"
          variant="outlined"
          value={newUser.username}
          onChange={handleInputChange}
          sx={{ mr: 1 }}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          value={newUser.password}
          onChange={handleInputChange}
          sx={{ mr: 1 }}
        />
        <TextField
          name="role"
          label="Role"
          variant="outlined"
          value={newUser.role}
          onChange={handleInputChange}
          sx={{ mr: 1 }}
        />
        <Button variant="contained" color="secondary" onClick={handleAddUser}>
          Add User
        </Button>
      </Box>
    </Box>
  );
};

export default Setup;
