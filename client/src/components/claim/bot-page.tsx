import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, UserPlus, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BotPageProps {
  onSendRequest: () => void;
}

interface BotData {
  id: number;
  name: string;
  avatar: string;
}

export function BotPage({ onSendRequest }: BotPageProps) {
  const [botData, setBotData] = useState<BotData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch bot data from Roblox API
  useEffect(() => {
    const fetchBotData = async () => {
      try {
        const response = await fetch("/api/getRobloxUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: "MM2Bot" }) // Bot username
        });

        if (response.ok) {
          const data = await response.json();
          setBotData(data);
        } else {
          // Fallback data if API fails
          setBotData({
            id: 1,
            name: "MM2Bot",
            avatar: ""
          });
        }
      } catch (err) {
        console.error("Failed to fetch bot data:", err);
        // Fallback data
        setBotData({
          id: 1,
          name: "MM2Bot", 
          avatar: ""
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBotData();
  }, []);

  const handleSendFriendRequest = () => {
    // Open Roblox bot profile for friend request
    if (botData) {
      window.open(`https://www.roblox.com/users/${botData.id}/profile`, "_blank");
    }
    // Trigger the thank you page
    onSendRequest();
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto">
        <motion.div 
          className="glass-effect rounded-2xl shadow-2xl p-8 text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-300">Loading bot information...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <motion.div 
        className="glass-effect rounded-2xl shadow-2xl p-8 text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center justify-center gap-2">
          <Bot className="w-6 h-6 text-primary" />
          Bot
        </h2>

        {/* Bot Profile */}
        <div className="mb-8">
          {botData?.avatar ? (
            <motion.img
              src={botData.avatar}
              alt={`${botData.name} avatar`}
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white/20"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          ) : (
            <motion.div
              className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-white/20"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Bot className="w-12 h-12 text-white" />
            </motion.div>
          )}
          <p className="text-white font-semibold text-lg">
            @{botData?.name || "MM2Bot"}
          </p>
        </div>

        {/* Send Friend Request Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mb-6"
        >
          <Button
            onClick={handleSendFriendRequest}
            className="w-full gaming-gradient hover:shadow-xl font-semibold py-4 px-6 rounded-lg transition-all duration-300 text-white border-0"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Send Request to Bot
          </Button>
        </motion.div>

        {/* Information Text */}
        <motion.div
          className="bg-slate-800/50 rounded-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-center mb-2">
            <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
            <p className="text-green-400 font-semibold text-sm">
              Delivery Information
            </p>
          </div>
          <p className="text-slate-300 text-sm">
            Once you send the request, your items will be delivered to you within 24 hours.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}