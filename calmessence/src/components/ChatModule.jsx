import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import { useAuth } from '../AuthContext'; // Adjust import path as necessary

const ChatModule = () => {
    const [experts, setExperts] = useState([]);
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { user } = useAuth();
    const userId = user.email;

    useEffect(() => {
        fetchExperts();
        fetchChats(user.email);
    }, [user.email]);

    const fetchExperts = async () => {
        const response = await axios.get('https://csci-5709-group8.onrender.com/api/chats/experts');
        setExperts(response.data);
    };

    const fetchChats = async (userId) => {
        const response = await axios.get(`https://csci-5709-group8.onrender.com/api/chats/chats/${userId}`);
        setChats(response.data);
    };

    const fetchMessages = async (chatId) => {
        const response = await axios.get(`https://csci-5709-group8.onrender.com/api/chats/messages/${chatId}`);
        setMessages(response.data);
    };

    const handleSendMessage = async () => {
        if (newMessage.trim() === '') return;
        await axios.post('https://csci-5709-group8.onrender.com/api/chats/messages', {
            chat_id: selectedChat.chat_id,
            sender_id: userId,
            message_text: newMessage
        });
        setNewMessage('');
        fetchMessages(selectedChat.chat_id);
    };

    const createChatRequest = async (userId1, userId2, user1Name, user2Name, lastMessageText) => {
        try {

          console.log( {
              user_id1: userId1,
              user_id2: userId2,
              user1_name: user1Name,
              user2_name: user2Name,
              last_message_text: lastMessageText
          });
            const response = await axios.post('https://csci-5709-group8.onrender.com/api/chats/chats/request', {
                user_id1: userId1,
                user_id2: userId2,
                user1_name: user1Name,
                user2_name: user2Name,
                last_message_text: lastMessageText
            });
            const chatId = response.data.chatId;
            console.log('Chat created with ID:', chatId);
            // You can fetch chats again or update the state accordingly
            fetchChats(userId1);
        } catch (error) {
            console.error('Error creating chat request:', error);
        }
    };

    return (
        <div className="h-screen flex flex-col md:flex-row">
            <Sidebar
                experts={experts}
                chats={chats}
                setSelectedChat={setSelectedChat}
                fetchMessages={fetchMessages}
                userId={userId}
                user_name={userId}
                createChatRequest={createChatRequest} // Pass the function to Sidebar if needed
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

export default ChatModule;
