import React, { useState, useEffect } from 'react';
import { getMessages, sendMessage, deleteMessage } from '../Api';
import { Typography, Container, List, ListItem, ListItemText, Box, TextField, Button, IconButton } from '@mui/material';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesData = await getMessages();
        setMessages(messagesData);
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError('Failed to fetch messages. Please check your connection or login status.');
      }
    };

    fetchMessages();
  }, []);

  const handleSendMessage = async () => {
    try {
      const messageData = { content: newMessage };
      const sentMessage = await sendMessage(messageData);
      setMessages([...messages, sentMessage]);
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message');
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await deleteMessage(messageId);
      setMessages(messages.filter((message) => message._id !== messageId));
    } catch (err) {
      console.error('Error deleting message:', err);
      setError('Failed to delete message');
    }
  };

  return (
      <Container
        maxWidth="md"
        sx={{
          mt: 4,
          bgcolor: '#6B003E',
          borderRadius: 2,
          p: 3,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ color: '#B2B2B2', mb: 3 }}
        >
          Announcements
        </Typography>
        {error && (
          <Typography color="error" align="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <List
          sx={{
            maxHeight: '50vh',
            overflow: 'auto',
            mb: 2,
            border: '1px solid #B2B2B2',
            borderRadius: 1,
            bgcolor: '#333',
          }}
        >
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <ListItem
                key={index}
                sx={{
                  borderBottom: '1px solid #555',
                  py: 1,
                  px: 2,
                  '&:last-child': { borderBottom: 'none' },
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  bgcolor: message.read ? '#444' : '#222',
                  '&:hover': {
                    bgcolor: '#555',
                  },
                }}
              >
                <ListItemText
                  primary={message.content}
                  primaryTypographyProps={{ sx: { color: '#FFFFFF' } }}
                  secondary={
                    message.user && message.user.username
                      ? `From: ${message.user.username}`
                      : 'From: Unknown'
                  }
                  secondaryTypographyProps={{ sx: { color: '#B2B2B2', fontSize: '0.875rem' } }}
                />
                <IconButton
                  onClick={() => handleDeleteMessage(message._id)}
                  sx={{ color: 'red' }}
                >
                  ❌
                </IconButton>
              </ListItem>
            ))
          ) : (
            <Typography sx={{ color: '#B2B2B2', textAlign: 'center', py: 2 }}>
              No announcements available.
            </Typography>
          )}
        </List>
        <Box sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="New Message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            multiline
            rows={4}
            variant="outlined"
            sx={{
              bgcolor: '#FFF',
              borderRadius: 1,
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#B2B2B2',
                },
                '&:hover fieldset': {
                  borderColor: '#8A2A54',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#B2B2B2',
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleSendMessage}
            fullWidth
            sx={{
              bgcolor: '#8A2A54',
              color: '#FFF',
              '&:hover': { bgcolor: '#6B003E' },
              fontWeight: 'bold',
              py: 1,
            }}
          >
            Send
          </Button>
        </Box>
      </Container>
  );
};

export default Messages;
