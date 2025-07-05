import { MessageSquare, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const NoChatSelected = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-1 flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="max-w-md text-center space-y-6">
        {/* Animated Icon Display */}
        <motion.div 
          className="flex justify-center mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 10,
            delay: 0.2
          }}
        >
          <div className="relative">
            <motion.div
              className="w-20 h-20 rounded-2xl bg-indigo-100 flex items-center justify-center"
              animate={{
                rotate: [0, 5, -5, 5, 0],
                y: [0, -10, 0]
              }}
              transition={{
                y: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 2,
                  ease: "easeInOut"
                },
                rotate: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 3
                }
              }}
            >
              <MessageSquare className="w-10 h-10 text-indigo-600" />
            </motion.div>
            
            {/* Floating dots animation */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-indigo-400 rounded-full"
                style={{
                  top: `${Math.random() * 60 + 20}%`,
                  left: `${Math.random() * 60 + 20}%`,
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Text with staggered animation */}
        <div className="overflow-hidden">
          <motion.h2 
            className="text-3xl font-bold text-gray-800 mb-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Welcome to Chatty!
          </motion.h2>
          
          <motion.p
            className="text-gray-500 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Select a conversation from the sidebar to start chatting
          </motion.p>
        </div>

        {/* Animated prompt */}
        <motion.div
          className="flex items-center justify-center text-indigo-600"
          animate={{ x: [-5, 5, -5] }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 1.5
          }}
        >
          <ChevronRight className="w-5 h-5 mr-1" />
          <span>Choose a chat to begin</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NoChatSelected;