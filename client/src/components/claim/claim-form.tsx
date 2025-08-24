import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Gift, Mail, Hash, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { claimFormSchema, type ClaimFormData } from "@shared/schema";

interface ClaimFormProps {
  onSubmit: (data: ClaimFormData) => void;
}

export function ClaimForm({ onSubmit }: ClaimFormProps) {
  const { toast } = useToast();
  
  const form = useForm<ClaimFormData>({
    resolver: zodResolver(claimFormSchema),
    defaultValues: {
      contactAddress: "",
      orderId: "",
      robloxUsername: "",
      confirmRobloxUsername: "",
    },
  });

  const handleSubmit = async (data: ClaimFormData) => {
    try {
      // Enhanced Roblox username validation
      const validationResponse = await fetch("/api/validateRobloxUsername", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: data.robloxUsername })
      });

      const validationResult = await validationResponse.json();

      if (!validationResult.valid) {
        toast({
          title: "Invalid Roblox Username",
          description: validationResult.error || "Username validation failed.",
          variant: "destructive"
        });
        return;
      }

      const robloxUser = validationResult.user;

      // Show enhanced success message with user info
      toast({
        title: "✅ Roblox User Verified",
        description: `Found ${robloxUser.name}${robloxUser.displayName ? ` (${robloxUser.displayName})` : ''} - Account ${robloxUser.accountAge ? `${robloxUser.accountAge} days old` : 'verified'}`,
      });

      onSubmit(data);
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Validation Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <motion.div 
        className="glass-effect rounded-2xl shadow-2xl p-6 sm:p-8 mx-4 sm:mx-0"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="w-16 h-16 gaming-gradient rounded-full flex items-center justify-center mx-auto mb-4 pulse-glow"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Gift className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">
            🗡️ Claim Your MM2 Items
          </h1>
          <p className="text-slate-300 text-sm">
            Enter your details to claim your Murder Mystery 2 items
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Contact Address */}
            <FormField
              control={form.control}
              name="contactAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-slate-300">
                    <Mail className="w-4 h-4" />
                    Contact Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="your.email@example.com"
                      className="gaming-input"
                    />
                  </FormControl>
                  <FormMessage className="text-secondary" />
                </FormItem>
              )}
            />

            {/* Order ID */}
            <FormField
              control={form.control}
              name="orderId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-slate-300">
                    <Hash className="w-4 h-4" />
                    Order ID
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="MM2-123456789"
                      className="gaming-input"
                    />
                  </FormControl>
                  <FormMessage className="text-secondary" />
                </FormItem>
              )}
            />

            {/* Roblox Username */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="robloxUsername"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-slate-300">
                      <User className="w-4 h-4" />
                      Roblox Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="roblox"
                        className="gaming-input"
                      />
                    </FormControl>
                    <FormMessage className="text-secondary" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmRobloxUsername"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-slate-300">
                      <User className="w-4 h-4" />
                      Confirm Roblox Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="roblox"
                        className="gaming-input"
                      />
                    </FormControl>
                    <FormMessage className="text-secondary" />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                className="w-full gaming-gradient hover:shadow-xl font-semibold py-4 px-6 rounded-lg transition-all duration-300 text-white border-0"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Claim"
                )}
              </Button>
            </motion.div>
          </form>
        </Form>
      </motion.div>
    </div>
  );
}
