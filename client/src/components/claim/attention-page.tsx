import { motion } from "framer-motion";
import { AlertTriangle, Smartphone, Users, Server, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AttentionPageProps {
  onJoinServer: () => void;
  onAddBot: () => void;
}

export function AttentionPage({ onJoinServer, onAddBot }: AttentionPageProps) {
  const handleJoinServer = () => {
    onJoinServer();
  };

  const handleAddBot = () => {
    onAddBot();
  };

  return (
    <div className="max-w-lg mx-auto">
      <motion.div 
        className="glass-effect rounded-2xl shadow-2xl p-8"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Warning Header */}
        <div className="flex items-center mb-6">
          <motion.div
            className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center mr-3"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <AlertTriangle className="w-5 h-5 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white">ATTENTION</h2>
        </div>

        {/* Instructions */}
        <div className="space-y-6 mb-8">
          {/* Mobile/Tablet Warning */}
          <motion.div
            className="bg-slate-800/50 rounded-lg p-4 border-l-4 border-accent"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-start">
              <Smartphone className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-white mb-1">MOBILE/TABLET:</p>
                <p className="text-slate-300 text-sm">
                  If you're on mobile and can't join, please send a friend request to our bot and then click "I sent a friend request"
                </p>
              </div>
            </div>
          </motion.div>

          {/* Under 13 Warning */}
          <motion.div
            className="bg-slate-800/50 rounded-lg p-4 border-l-4 border-secondary"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-start">
              <Users className="w-5 h-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-white mb-1">UNDER 13:</p>
                <p className="text-slate-300 text-sm">
                  Please make sure you send a friend request to our bot so you can join the server!
                </p>
              </div>
            </div>
          </motion.div>

          {/* Additional Note */}
          <motion.div
            className="bg-slate-700/30 rounded-lg p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-slate-300 text-sm">
              Even if you have gone through this process before, It may need to be completed again.
            </p>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={handleJoinServer}
              className="w-full gaming-gradient hover:shadow-xl font-semibold py-4 px-6 rounded-lg transition-all duration-300 text-white border-0"
            >
              <Server className="w-4 h-4 mr-2" />
              Join private server
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={handleAddBot}
              className="w-full gaming-gradient-secondary hover:shadow-xl font-semibold py-4 px-6 rounded-lg transition-all duration-300 text-white border-0"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add Bot
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
