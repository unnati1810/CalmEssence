const Sidebar = ({ experts, chats, setSelectedChat, fetchMessages, userId }) => (
  <div className="w-full md:w-1/4 h-full bg-gray-100 p-4 overflow-y-auto">
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Chats</h2>
      <div className="max-h-64 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.chat_id}
            onClick={() => {
              setSelectedChat(chat);
              fetchMessages(chat.chat_id);
            }}
            className="p-2 bg-white rounded-lg mb-2 shadow-md cursor-pointer hover:bg-gray-200"
          >
            <h3 className="text-lg font-medium">
              {chat.user_id1 === userId ? chat.user2_name : chat.user1_name}
            </h3>
          </div>
        ))}
      </div>
    </div>
    <div>
      <h2 className="text-xl font-semibold mb-2">Experts</h2>
      <div className="max-h-64 overflow-y-auto">
        {experts.filter(expert => !chats.some(chat => chat.user_id2 === expert.email)).map((expert) => (
          <div
            key={expert.email}
            className="p-2 bg-white rounded-lg mb-2 shadow-md cursor-pointer hover:bg-gray-200"
          >
            <h3 className="text-lg font-medium">{expert.full_name}</h3>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Sidebar;
