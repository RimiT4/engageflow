import { motion } from "framer-motion";
import { User, Check, Crown, Shield } from "lucide-react";

interface RobloxUser {
  id: number;
  name: string;
  displayName?: string;
  avatar: string;
  isOnline?: boolean;
  lastOnline?: string;
  accountAge?: number;
  premium?: boolean;
  verified?: boolean;
}

interface RobloxUserCardProps {
  user: RobloxUser;
  loading?: boolean;
}

export function RobloxUserCard({ user, loading = false }: RobloxUserCardProps) {
  if (loading) {
    return (
      <motion.div
        className="w-24 h-24 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-white/20"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
      </motion.div>
    );
  }

  return (
    <div className="text-center">
      {/* Avatar */}
      {user.avatar ? (
        <motion.img
          src={user.avatar}
          alt={`${user.name} avatar`}
          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white/20"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      ) : (
        <motion.div
          className="w-24 h-24 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-white/20"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <User className="w-12 h-12 text-slate-400" />
        </motion.div>
      )}

      {/* User Info */}
      <div className="space-y-1">
        <p className="text-white font-semibold text-lg">
          {user.displayName || user.name}
        </p>
        <p className="text-slate-300 text-sm">@{user.name}</p>

        {/* Badges */}
        <div className="flex items-center justify-center gap-2 mt-2">
          {user.verified && (
            <div className="flex items-center bg-blue-500/20 px-2 py-1 rounded-full">
              <Shield className="w-3 h-3 text-blue-400 mr-1" />
              <span className="text-blue-400 text-xs">Verified</span>
            </div>
          )}
          {user.premium && (
            <div className="flex items-center bg-yellow-500/20 px-2 py-1 rounded-full">
              <Crown className="w-3 h-3 text-yellow-400 mr-1" />
              <span className="text-yellow-400 text-xs">Premium</span>
            </div>
          )}
        </div>

        {/* Account Age */}
        {user.accountAge && (
          <p className="text-slate-400 text-xs mt-1">
            Account: {user.accountAge} days old
          </p>
        )}

        {/* Online Status */}
        {user.isOnline !== undefined && (
          <div className="flex items-center justify-center mt-1">
            <div className={`w-2 h-2 rounded-full mr-1 ${user.isOnline ? 'bg-green-400' : 'bg-gray-400'}`}></div>
            <span className="text-slate-400 text-xs">
              {user.isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}