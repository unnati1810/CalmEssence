import MessageBubble from './MessageBubble';

const ChatWindow = ({ selectedChat, messages, newMessage, setNewMessage, handleSendMessage }) => (
  <div className="flex-1 flex flex-col">
    {selectedChat ? (
      <>
        <div className="h-16 bg-gray-200 flex items-center px-4">
          <h2 className="text-xl font-semibold">
            {selectedChat.user_id1 === 'vishesh@example.com' ? selectedChat.user2_name : selectedChat.user1_name}
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <MessageBubble key={index} message={message} />
            ))
          ) : (
            <p className="text-center text-gray-500">No messages yet</p>
          )}
        </div>
        <div className="h-16 bg-gray-200 flex items-center p-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </>
    ) : (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">Select a chat to start messaging</p>
      </div>
    )}
  </div>
);

export default ChatWindow;
