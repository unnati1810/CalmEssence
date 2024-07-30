import React from 'react';

const MessageBubble = ({ message }) => {
  const messageDate = new Date(message.created_at);
  const messageTime = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`mb-2 flex ${message.sender_id === 'vishesh@example.com' ? 'justify-end' : 'justify-start'}`}>
      <div className={`p-2 rounded-lg max-w-md ${message.sender_id === 'vishesh@example.com' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
        <p className="mb-1">{message.message_text}</p>
        <span className="text-xs text-gray-600">{messageTime}</span>
      </div>
    </div>
  );
};

export default MessageBubble;
