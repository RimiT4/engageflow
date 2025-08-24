import { motion } from "framer-motion";
import { CheckCircle, Server, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FinalConfirmationProps {
  onComplete: () => void;
}

export function FinalConfirmation({ onComplete }: FinalConfirmationProps) {
  const handleJoinServer = () => {
    // Redirect to Roblox server and trigger completion
    window.open("https://www.roblox.com/games/142823291", "_blank");
    onComplete();
  };

  return (
    <div className="max-w-md mx-auto">
      <motion.div 
        className="glass-effect rounded-2xl shadow-2xl p-8 text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Success Icon */}
        <motion.div
          className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <CheckCircle className="w-10 h-10 text-white" />
        </motion.div>

        <h2 className="text-2xl font-bold text-white mb-4">
          Join the bot, and claim your items!
        </h2>
        <p className="text-slate-300 mb-8">
          Join the private server in order to receive everything you purchased.
        </p>

        {/* Final Action Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mb-6"
        >
          <Button
            onClick={handleJoinServer}
            className="w-full gaming-gradient hover:shadow-xl font-semibold py-4 px-6 rounded-lg transition-all duration-300 text-white border-0"
          >
            <Server className="w-4 h-4 mr-2" />
            Join Private Server
          </Button>
        </motion.div>


      </motion.div>
    </div>
  );
}
