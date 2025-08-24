import { motion } from "framer-motion";
import { CheckCircle, ExternalLink, Mail, Package, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface OrderInfo {
  email: string;
  orderId: string;
  robloxUsername: string;
}

export function ThankYouPage() {
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);

  useEffect(() => {
    // Get order info from localStorage (saved during claim process)
    const savedOrderInfo = localStorage.getItem('orderInfo');
    if (savedOrderInfo) {
      setOrderInfo(JSON.parse(savedOrderInfo));
    }
  }, []);

  const handleVisitStore = () => {
    window.open("https://mm2items.com", "_blank");
  };

  const handleContactSupport = () => {
    window.open("mailto:support@mm2items.com?subject=Order Support - " + (orderInfo?.orderId || ""), "_blank");
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
          Thank you for your purchase!
        </h2>
        <p className="text-slate-300 mb-6">
          Your order has been processed successfully. Items will be delivered within 24 hours.
        </p>

        {/* Order Information Section */}
        {orderInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Package className="w-5 h-5 mr-2 text-blue-400" />
                  Your Order Information
                </h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center">
                      <Package className="w-4 h-4 mr-2" />
                      Order ID:
                    </span>
                    <span className="text-white font-mono">{orderInfo.orderId}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      Email:
                    </span>
                    <span className="text-white">{orderInfo.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Roblox Username:
                    </span>
                    <span className="text-white">{orderInfo.robloxUsername}</span>
                  </div>

                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Support Contact Section */}
        <motion.div
          className="bg-orange-900/30 border border-orange-700/50 rounded-lg p-4 mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-orange-200 mb-2 flex items-center justify-center">
            <Mail className="w-5 h-5 mr-2" />
            Need Help?
          </h3>
          <p className="text-orange-100 text-sm mb-3">
            Contact us if there's an error in your order information or if items are not delivered within 24 hours.
          </p>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={handleContactSupport}
              variant="outline"
              className="w-full bg-orange-600/20 border-orange-500 text-orange-200 hover:bg-orange-600/30 hover:text-orange-100 font-medium py-2"
            >
              <Mail className="w-4 h-4 mr-2" />
              support@mm2items.com
            </Button>
          </motion.div>
        </motion.div>

        {/* Store Link Section */}
        <motion.div
          className="bg-slate-800/50 rounded-lg p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-slate-300 text-sm mb-4">Visit our store for more items:</p>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={handleVisitStore}
              className="w-full gaming-gradient hover:shadow-xl font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-white border-0"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              mm2items.com
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}