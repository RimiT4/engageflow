import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "./db";
import { claims } from "@shared/schema";
import { getRobloxUser, validateRobloxUsername } from "./robloxApi";
import { eq } from "drizzle-orm";

export async function registerRoutes(app: Express): Promise<Server> {
  // Enhanced Roblox User API endpoint
  app.post("/api/getRobloxUser", async (req, res) => {
    try {
      const { username } = req.body;
      
      if (!username) {
        return res.status(400).json({ error: "Username is required" });
      }

      const userData = await getRobloxUser(username);
      res.status(200).json(userData);
    } catch (error) {
      console.error("getRobloxUser error:", error);
      res.status(404).json({ error: error instanceof Error ? error.message : "User not found" });
    }
  });

  // Roblox Username Validation endpoint
  app.post("/api/validateRobloxUsername", async (req, res) => {
    try {
      const { username } = req.body;
      
      const validation = await validateRobloxUsername(username);
      
      if (validation.isValid) {
        res.status(200).json({
          valid: true,
          user: validation.user
        });
      } else {
        res.status(400).json({
          valid: false,
          error: validation.error
        });
      }
    } catch (error) {
      console.error("validateRobloxUsername error:", error);
      res.status(500).json({
        valid: false,
        error: "Validation service temporarily unavailable"
      });
    }
  });

  // Claims submission endpoint
  app.post("/api/claims", async (req, res) => {
    try {
      const { email, orderId, robloxUsername } = req.body;
      
      console.log("Processing claim submission:", { email, orderId, robloxUsername });
      
      // Validate required fields
      if (!email || !orderId || !robloxUsername) {
        return res.status(400).json({ 
          error: "Missing required fields: email, orderId, or robloxUsername" 
        });
      }
      
      // Check if order ID already exists  
      const existingClaim = await db
        .select()
        .from(claims)
        .where(eq(claims.orderId, orderId))
        .limit(1);

      if (existingClaim.length > 0) {
        return res.status(400).json({ 
          error: "Order number already used. Please check your order ID or contact support." 
        });
      }

      // Get Roblox user data
      const robloxData = await getRobloxUser(robloxUsername);
      console.log("Roblox user data retrieved:", robloxData);
      
      // Save to PostgreSQL via Drizzle
      const [savedClaim] = await db
        .insert(claims)
        .values({
          email,
          orderId,
          robloxUsername: robloxData.name,
          robloxUserId: robloxData.id,
          avatarUrl: robloxData.avatar || null
        })
        .returning();

      console.log("Claim saved successfully:", savedClaim);

      res.status(201).json({ 
        success: true, 
        claim: savedClaim
      });
    } catch (error) {
      console.error("Claims submission error:", error);
      
      // Provide more specific error messages
      if (error instanceof Error) {
        if (error.message.includes('User not found')) {
          return res.status(400).json({ error: "Roblox user not found. Please check the username." });
        }
        if (error.message.includes('duplicate')) {
          return res.status(400).json({ error: "A claim with this information already exists." });
        }
      }
      
      res.status(500).json({ error: "Failed to save claim. Please try again." });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
