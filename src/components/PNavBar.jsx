import React,{useState, useEffect} from 'react'
import {Notes,PersonalRecords,PersonalStats,Sprint_Jump} from './Athletes'
import { PlayerDash} from '../pages'
import AddIcon from '@mui/icons-material/Add';
import { TextField, Button, Box, Typography, Container, Stack, InputAdornment, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Badge from '@mui/material/Badge';
import Modal from '@mui/material/Modal';
import ListItemText from '@mui/material/ListItemText';
import { getMessages, sendMessage } from '../Api';
import MenuIcon from '@mui/icons-material/Menu';


const PNavBar = () => {
    const [unreadMessages, setUnreadMessages] = useState([]);
    const [allMessages, setAllMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    
    const [hamVis, setHamVis] = useState(false)
  
    useEffect(() => {
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
      fetchMessages();
    },[]);

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
        } catch (err) {
          console.error('Error sending message:', err);
        }
      };
      




    
  const navigate = useNavigate();
  const [sidebarItems, setSidebarItems] = useState([PlayerDash, Notes, PersonalStats])


  const handleCompClick = (link) => {
    navigate(`/${link}`);
  }

  const handleLogout = () => {
    // Clear any authentication data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  const handleMenuClick = () => {
    setHamVis(!hamVis)
  }

  

  return (
    <Box sx={{width: '100%', height: '100%', backgroundColor: '#4B0101', display: 'flex',}}>
    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
        <Stack direction='row' sx={{justifyContent: 'center', alignItems: 'center', padding:'8px', backgroundColor:'white', borderRadius:'50px'}}>
           <Button onClick={() => handleMenuClick()}>
             <MenuIcon sx={{color:'black'}} />
           </Button>
        </Stack>
    {/* Menu Component */}
    {hamVis && (
  <Box sx={{
    position: 'absolute', bottom: hamVis ? '0' : '-100vh', transition: 'bottom 0.3s ease', width: '100%', height: '100vh', backgroundColor: '#4B0101', zIndex: 10, display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center'
  }}>
    {sidebarItems.map((item, key) => (
      <Box key={key} sx={{ margin: '10px', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
        <Button sx={{ transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.05)' } }} onClick={() => handleCompClick(item.name)}>
        <Typography sx={{ color: 'white', textAlign: 'center', borderBottom:'4px solid grey' }}>
        {item.name === "PlayerDash" ? 'Dashboard' :
          item.name === "PersonalRecords" ? 'Personal Records' :
          item.name === "PersonalStats" ? 'Personal Stats' :
          item.name === "Sprint_Jump" ? 'Sprints and Jump Stats' :
          item.name}
      </Typography>
        </Button>
      </Box>
    ))}
    <Typography onClick={() => handleLogout()} sx={{ transition: 'transform 0.3s ease ', '&:hover': { transform: 'scale(1.05)' }, color: 'white', textAlign: 'center', margin: '20px' }}>Log Out</Typography>
    <Stack direction="row" sx={{ justifyContent: 'center', alignItems: 'flex-end', padding: '8px', backgroundColor: 'white', borderRadius: '50px' }}>
      <Button onClick={() => handleMenuClick()}>
        <MenuIcon sx={{ color: 'black' }} />
      </Button>
    </Stack>
  </Box>
)}


    

    <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
      >
        <Badge
          badgeContent={unreadMessages.length}
          color="error"
          overlap="circular"
        >
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
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box
          sx={{
            bgcolor: 'white',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            width: '80%',
            maxHeight: '75%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Announcements
          </Typography>
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
                  </ListItem>
                ))
              ) : (
                <Typography>No announcements available.</Typography>
              )}
            </List>
          </Box>
          {/* Fixed send message area */}
        </Box>
      </Modal>
      </Box>
  </Box>
  
  )
}

export default PNavBar;