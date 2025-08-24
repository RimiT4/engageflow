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

export async function getRobloxUser(username: string): Promise<RobloxUser> {
  try {
    // Step 1: Get user info from username
    const userResponse = await fetch("https://users.roblox.com/v1/usernames/users", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      },
      body: JSON.stringify({ usernames: [username], excludeBannedUsers: true })
    });

    if (!userResponse.ok) {
      throw new Error(`Roblox user lookup failed: ${userResponse.status}`);
    }

    const userData = await userResponse.json();
    
    if (!userData?.data?.[0]) {
      throw new Error(`Username "${username}" not found`);
    }

    const user = userData.data[0];

    // Step 2: Get detailed user information
    const detailsResponse = await fetch(`https://users.roblox.com/v1/users/${user.id}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
    });

    let userDetails = null;
    if (detailsResponse.ok) {
      userDetails = await detailsResponse.json();
    }

    // Step 3: Get avatar with multiple fallback methods
    let avatarUrl = "";
    
    // Method 1: Official thumbnails API
    try {
      const avatarResponse = await fetch(
        `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${user.id}&size=150x150&format=Png&isCircular=false`,
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
          }
        }
      );
      
      if (avatarResponse.ok) {
        const avatarData = await avatarResponse.json();
        avatarUrl = avatarData?.data?.[0]?.imageUrl;
      }
    } catch (avatarError) {
      console.warn("Avatar API method 1 failed:", avatarError);
    }

    // Method 2: Fallback to direct thumbnail URL
    if (!avatarUrl) {
      avatarUrl = `https://www.roblox.com/headshot-thumbnail/image?userId=${user.id}&width=150&height=150&format=png`;
    }

    // Step 4: Get online status (optional, may fail)
    let isOnline = false;
    try {
      const presenceResponse = await fetch(`https://presence.roblox.com/v1/presence/users`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        },
        body: JSON.stringify({ userIds: [user.id] })
      });
      
      if (presenceResponse.ok) {
        const presenceData = await presenceResponse.json();
        isOnline = presenceData?.userPresences?.[0]?.userPresenceType === 1;
      }
    } catch (presenceError) {
      console.warn("Presence API failed:", presenceError);
    }

    return {
      id: user.id,
      name: user.name,
      displayName: userDetails?.displayName || user.displayName,
      avatar: avatarUrl,
      isOnline,
      lastOnline: userDetails?.lastOnline,
      accountAge: userDetails?.created ? Math.floor((Date.now() - new Date(userDetails.created).getTime()) / (1000 * 60 * 60 * 24)) : undefined,
      premium: userDetails?.isPremium,
      verified: userDetails?.hasVerifiedBadge
    };
  } catch (error) {
    console.error(`Roblox API error for username "${username}":`, error);
    throw new Error(`Failed to verify Roblox username: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Enhanced username validation
export async function validateRobloxUsername(username: string): Promise<{ isValid: boolean; user?: RobloxUser; error?: string }> {
  try {
    // Basic validation
    if (!username || typeof username !== 'string') {
      return { isValid: false, error: "Username is required" };
    }

    if (username.length < 3 || username.length > 20) {
      return { isValid: false, error: "Username must be between 3-20 characters" };
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return { isValid: false, error: "Username can only contain letters, numbers, and underscores" };
    }

    // Check with Roblox API
    const user = await getRobloxUser(username);
    return { isValid: true, user };
  } catch (error) {
    return { 
      isValid: false, 
      error: error instanceof Error ? error.message : "Failed to validate username"
    };
  }
}