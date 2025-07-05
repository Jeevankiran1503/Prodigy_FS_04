import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-gray-50">
      <div className="flex items-center justify-center h-full px-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-7xl h-[90vh] overflow-hidden">
          <div className="flex h-full">
            {/* Sidebar with subtle border */}
            <div className="border-r border-gray-100">
              <Sidebar />
            </div>
            
            {/* Main chat area */}
            <main className="flex-1 flex flex-col">
              {!selectedUser ? (
                <NoChatSelected />
              ) : (
                <ChatContainer />
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;