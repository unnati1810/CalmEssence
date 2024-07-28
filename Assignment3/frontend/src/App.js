import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';

const App = () => {
  const [experts, setExperts] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userId, setUserId] = useState('vishesh@example.com'); // replace with logged-in user ID

  useEffect(() => {
    fetchExperts();
    fetchChats(userId);
  }, [userId]);

  const fetchExperts = async () => {
    const response = await axios.get('/experts');
    setExperts(response.data);
  };

  const fetchChats = async (userId) => {
    const response = await axios.get(`/chats/${userId}`);
    setChats(response.data);
  };

  const fetchMessages = async (chatId) => {
    const response = await axios.get(`/messages/${chatId}`);
    setMessages(response.data);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;
    await axios.post('/messages', {
      chat_id: selectedChat.chat_id,
      sender_id: userId,
      message_text: newMessage
    });
    setNewMessage('');
    fetchMessages(selectedChat.chat_id);
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">
      <Sidebar
        experts={experts}
        chats={chats}
        setSelectedChat={setSelectedChat}
        fetchMessages={fetchMessages}
        userId={userId}
      />
      <ChatWindow
        selectedChat={selectedChat}
        messages={messages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default App;
