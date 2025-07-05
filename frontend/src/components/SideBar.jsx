import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, User, Wifi, WifiOff } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers, authUser } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // Filter out current user and apply online filter
  const filteredUsers = (showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users
  ).filter(user => user._id !== authUser?._id);

  return (
    <aside className="w-full h-full bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Contacts</h3>
        <div className="flex items-center mt-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-10 h-5 rounded-full shadow-inner transition-colors duration-200 ${
                showOnlineOnly ? 'bg-indigo-500' : 'bg-gray-300'
              }`}></div>
              <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                showOnlineOnly ? 'translate-x-5' : ''
              }`}></div>
            </div>
            <span className="text-sm text-gray-600">
              Online only ({onlineUsers.length - 1} online)
            </span>
          </label>
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto p-2">
        {isUsersLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="h-6 w-6 animate-spin text-indigo-500" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4 text-center">
            <WifiOff className="h-8 w-8 mb-2" />
            <p>No {showOnlineOnly ? 'online' : ''} users available</p>
          </div>
        ) : (
          <AnimatePresence>
            {filteredUsers.map((user) => (
              <motion.button
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`w-full text-left p-3 rounded-lg transition-colors duration-200 flex items-center ${
                  selectedUser?._id === user._id 
                    ? 'bg-indigo-50' 
                    : 'hover:bg-gray-50'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative mr-3">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.fullName}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow"
                  />
                  {onlineUsers.includes(user._id) && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 truncate">{user.fullName}</p>
                  <div className="flex items-center">
                    {onlineUsers.includes(user._id) ? (
                      <>
                        <Wifi className="h-3 w-3 text-green-500 mr-1" />
                        <span className="text-xs text-gray-500">Online</span>
                      </>
                    ) : (
                      <>
                        <User className="h-3 w-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">Offline</span>
                      </>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;