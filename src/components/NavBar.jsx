import React, { useState, useEffect } from 'react';
import { Roster, Scheduling, PRS, Film, EquipmentManager, Training } from '../pages';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Badge from '@mui/material/Badge';
import Modal from '@mui/material/Modal';
import ListItemText from '@mui/material/ListItemText';
import { getMessages, sendMessage, deleteMessage } from '../Api';
import { HCoachDash } from '../pages';
import AddIcon from '@mui/icons-material/Add';
import { TextField, Button, Box, Typography, Container, Stack, InputAdornment, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete'; // Import the Delete Icon


const NavBar = () => {
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSendMessage = async () => {
    try {
      const messageData = { content: newMessage };
      await sendMessage(messageData);
      setNewMessage('');
      fetchMessages();
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const fetchMessages = async () => {
    try {
      const messagesData = await getMessages();
      const unread = messagesData.filter((message) => !message.read);
      setUnreadMessages(unread);
      setAllMessages(messagesData);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await deleteMessage(messageId); // Call the delete API
      fetchMessages(); // Re-fetch the messages after deletion
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  const navigate = useNavigate();
  const [sidebarItems, setSidebarItems] = useState([HCoachDash, Roster, Scheduling, PRS, EquipmentManager, Training]);

  const handleCompClick = (link) => {
    navigate(`/${link}`);
  };

  const handleLogout = () => {
    // Clear any authentication data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <Box sx={{ width: '10%', height: '100%', backgroundColor: '#4B0101', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Box>
        <Stack sx={{ flexDirection: 'column' }}>
          {sidebarItems.map((item, key) => (
            <Box sx={{ margin: '10px', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
              <Button sx={{ transition: 'transform 0.3s ease ', '&:hover': { transform: 'scale(1.05)' } }} onClick={() => handleCompClick(item.name)}>
                <Typography sx={{ color: 'white', textAlign: 'center' }}>{item.name === "HCoachDash" ? 'Dashboard' : item.name === "EquipmentManager" ? 'Equipment' : item.name}
                </Typography>
              </Button>
            </Box>
          ))}
        </Stack>
       
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'bottom' }}>
        <Stack sx={{ flexDirection: 'column' }}>
          <Typography sx={{ color: 'white', textAlign: 'center', margin: '20px' }}>Settings</Typography>
          <Typography onClick={() => handleLogout()} sx={{ transition: 'transform 0.3s ease ', '&:hover': { transform: 'scale(1.05)' }, color: 'white', textAlign: 'center', margin: '20px' }}>Log Out</Typography>
        </Stack>
      </Box>
      <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        <Badge badgeContent={unreadMessages.length} color="error" overlap="circular">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleModalOpen}
            sx={{
              borderRadius: '50%',
              minWidth: '50px',
              minHeight: '50px',
              bgcolor: 'maroon',
              color: '#FFFFFF',
              '&:hover': {
                bgcolor: '#8A2A54',
              },
            }}
          >
            📩
          </Button>
        </Badge>
      </Box>

      {/* Modal for Messages */}
      <Modal open={modalOpen} onClose={handleModalClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ bgcolor: 'white', borderRadius: 2, boxShadow: 24, p: 4, width: '400px', maxHeight: '500px', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Announcements</Typography>
          {/* Scrollable message list */}
          <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
            <List>
              {allMessages.length > 0 ? (
                allMessages.map((message, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      cursor: 'pointer',
                      mb: 1,
                      bgcolor: message.read ? '#f0f0f0' : '#e0e0e0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <ListItemText
                      primary={message.content}
                      secondary={message.user && message.user.username
                        ? `From: ${message.user.username}`
                        : 'From: Unknown'}
                    />
                    <IconButton onClick={() => handleDeleteMessage(message._id)} sx={{ color: '#d32f2f' }}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))
              ) : (
                <Typography>No announcements available.</Typography>
              )}
            </List>
          </Box>
          {/* Fixed send message area */}
          <Box>
            <TextField
              fullWidth
              label="New Message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              multiline
              rows={2}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleSendMessage}
              fullWidth
              sx={{
                bgcolor: 'maroon',
                color: '#FFF',
                '&:hover': { bgcolor: 'maroon' },
                fontWeight: 'bold',
                py: 1,
              }}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default NavBar;
