import { type User, type InsertUser, type Claim, type InsertClaim } from "@shared/schema";
import { randomUUID } from "crypto";

// Updated interface with CRUD methods for both users and claims
export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getClaim(id: string): Promise<Claim | undefined>;
  createClaim(claim: InsertClaim): Promise<Claim>;
  getClaimsByEmail(email: string): Promise<Claim[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private claims: Map<string, Claim>;

  constructor() {
    this.users = new Map();
    this.claims = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getClaim(id: string): Promise<Claim | undefined> {
    return this.claims.get(id);
  }

  async createClaim(insertClaim: InsertClaim): Promise<Claim> {
    const id = randomUUID();
    const claim: Claim = { 
      ...insertClaim,
      avatarUrl: insertClaim.avatarUrl || null,
      id, 
      createdAt: new Date()
    };
    this.claims.set(id, claim);
    return claim;
  }

  async getClaimsByEmail(email: string): Promise<Claim[]> {
    return Array.from(this.claims.values()).filter(
      (claim) => claim.email === email,
    );
  }
}

export const storage = new MemStorage();
