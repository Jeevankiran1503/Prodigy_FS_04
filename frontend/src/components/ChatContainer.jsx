import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../libs/utils";
import { Loader2 } from "lucide-react";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (isMessagesLoading) {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        <ChatHeader />
        <div className="flex-1 flex items-center justify-center overflow-y-auto p-4">
          <div className="flex flex-col items-center space-y-2">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            <p className="text-gray-500">Loading messages...</p>
          </div>
        </div>
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message._id}
              className={`flex ${message.senderId === authUser._id ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${message.senderId === authUser._id 
                  ? "bg-indigo-600 text-white rounded-br-none" 
                  : "bg-white text-gray-800 rounded-bl-none shadow-sm"}`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="rounded-lg mb-2 max-h-60 object-cover"
                  />
                )}
                {message.text && (
                  <p className={`${message.image ? "mt-2" : ""}`}>{message.text}</p>
                )}
                <div className={`text-xs mt-1 ${message.senderId === authUser._id ? "text-indigo-200" : "text-gray-500"}`}>
                  {formatMessageTime(message.createdAt)}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;