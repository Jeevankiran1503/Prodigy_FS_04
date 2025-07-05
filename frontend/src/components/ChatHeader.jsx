import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="px-4 py-3 border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar with online status indicator */}
          <div className="relative">
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <img 
                src={selectedUser.profilePic || "/avatar.png"} 
                alt={selectedUser.fullName}
                className="h-full w-full object-cover"
              />
            </div>
            {onlineUsers.includes(selectedUser._id) && (
              <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium text-gray-900">{selectedUser.fullName}</h3>
            <p className={`text-sm ${onlineUsers.includes(selectedUser._id) ? 'text-green-600' : 'text-gray-500'}`}>
              {onlineUsers.includes(selectedUser._id) ? (
                <span className="flex items-center">
                  <span className="h-2 w-2 bg-green-500 rounded-full mr-1.5"></span>
                  Online
                </span>
              ) : (
                "Offline"
              )}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button 
          onClick={() => setSelectedUser(null)}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-500 hover:text-gray-700"
          aria-label="Close chat"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;