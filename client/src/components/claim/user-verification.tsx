import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface UserVerificationProps {
  username: string;
  onConfirm: () => void;
  onGoBack: () => void;
  formData?: {
    contactAddress: string;
    orderId: string;
    robloxUsername: string;
    confirmRobloxUsername: string;
  };
}

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

export function UserVerification({
  username,
  onConfirm,
  onGoBack,
  formData,
}: UserVerificationProps) {
  const [userProfile, setUserProfile] = useState<RobloxUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("/api/getRobloxUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username }),
        });

        if (response.ok) {
          const userData = await response.json();
          setUserProfile(userData);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [username]);

  const handleConfirm = async () => {
    if (!userProfile) {
      toast({
        title: "Error",
        description: "User profile not loaded yet.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData?.contactAddress,
          orderId: formData?.orderId,
          robloxUsername: username,
          robloxUserId: userProfile.id, 
          avatarUrl: userProfile.avatar, 
        }),
      });

      if (response.ok) {
        // Save order information to localStorage for the thank you page
        const orderInfo = {
          email: formData?.contactAddress || '',
          orderId: formData?.orderId || '',
          robloxUsername: username,
        };
        localStorage.setItem('orderInfo', JSON.stringify(orderInfo));

        toast({
          title: "Claim Submitted!",
          description: "Your claim has been successfully submitted.",
        });
        onConfirm();
      } else {
        // Get the specific error message from the backend response
        const errorData = await response.json();
        const errorMessage = errorData.error || "Failed to submit claim. Please try again.";
        
        toast({
          title: "Submission Failed",
          description: errorMessage,
          variant: "destructive",
        });
        return;
      }
    } catch (error) {
      console.error("Error submitting claim:", error);
      toast({
        title: "Connection Error",
        description: "Network error occurred. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <motion.div
        className="glass-effect rounded-2xl shadow-2xl p-8 text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-white mb-2">
          Is this you? Double check for us.
        </h2>
        <p className="text-slate-300 text-sm mb-8">
          Just a reminder, this cannot be changed in the future.
        </p>

        {/* User Avatar */}
        <div className="mb-8">
          {loading ? (
            <motion.div
              className="w-24 h-24 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-white/20"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
            </motion.div>
          ) : userProfile?.avatar ? (
            <motion.img
              src={userProfile.avatar}
              alt={`${username} avatar`}
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
          <div className="text-center">
            <p className="text-white font-semibold text-lg">
              {userProfile?.displayName || userProfile?.name || username}
            </p>
            <p className="text-slate-300 text-sm">
              @{userProfile?.name || username}
            </p>
            {userProfile?.verified && (
              <div className="flex items-center justify-center mt-1">
                <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center mr-1">
                  <Check className="w-2 h-2 text-white" />
                </div>
                <span className="text-blue-400 text-xs">Verified</span>
              </div>
            )}
            {userProfile?.premium && (
              <div className="mt-1">
                <span className="text-yellow-400 text-xs">Premium</span>
              </div>
            )}
            {userProfile?.accountAge && (
              <div className="mt-1">
                <span className="text-slate-400 text-xs">
                  Account: {userProfile.accountAge} days old
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={onGoBack}
              className="w-full gaming-gradient-secondary hover:shadow-xl font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-white border-0"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleConfirm}
              disabled={submitting}
              className="w-full gaming-gradient hover:shadow-xl font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-white border-0 disabled:opacity-50"
            >
              {submitting ? (
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              ) : (
                <Check className="w-4 h-4 mr-2" />
              )}
              {submitting ? "Submitting..." : "That's Me"}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
