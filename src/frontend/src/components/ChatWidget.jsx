import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Box, TextField, IconButton, Paper, Typography, List, ListItem, ListItemText, Fab } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';

const ChatWidget = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isOpen]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { sender: 'user', text: message };
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/v1/chat/message', 
        { 
          message: userMessage.text,
          language: i18n.language 
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const botMessage = { sender: 'bot', text: res.data.response };
      setChatHistory(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = { sender: 'bot', text: t('chatError') || 'Sorry, I encountered an error.' };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
      {!isOpen && (
        <Fab color="primary" aria-label="chat" onClick={() => setIsOpen(true)}>
          <ChatIcon />
        </Fab>
      )}

      {isOpen && (
        <Paper elevation={3} sx={{ width: 300, height: 400, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1">{t('saleemAssistant') || 'Saleem Assistant'}</Typography>
            <IconButton size="small" onClick={() => setIsOpen(false)} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, bgcolor: '#f5f5f5' }}>
            <List>
              {chatHistory.map((msg, index) => (
                <ListItem key={index} sx={{ justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                  <Paper sx={{ 
                    p: 1.5, 
                    maxWidth: '80%', 
                    bgcolor: msg.sender === 'user' ? 'primary.light' : 'white',
                    color: msg.sender === 'user' ? 'white' : 'text.primary',
                    borderRadius: 2
                  }}>
                    <ListItemText primary={msg.text} />
                  </Paper>
                </ListItem>
              ))}
              {isLoading && (
                 <ListItem sx={{ justifyContent: 'flex-start' }}>
                  <Paper sx={{ p: 1.5, bgcolor: 'white', borderRadius: 2 }}>
                    <Typography variant="caption">Typing...</Typography>
                  </Paper>
                </ListItem>
              )}
               <div ref={messagesEndRef} />
            </List>
          </Box>

          <Box sx={{ p: 2, bgcolor: 'white', display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder={t('typeMessage') || "Type a message..."}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <IconButton color="primary" onClick={handleSendMessage} disabled={isLoading || !message.trim()}>
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default ChatWidget;
