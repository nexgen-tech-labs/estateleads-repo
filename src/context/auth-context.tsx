"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getUserProfile, createUserAndAgency, type UserProfile } from "@/lib/firestore/agency";

interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  profile: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          let userProfile = await getUserProfile(firebaseUser.uid);

          // Google OAuth users won't have a profile doc yet — create one
          if (!userProfile) {
            const displayName = firebaseUser.displayName ?? "";
            const email = firebaseUser.email ?? "";
            // Use email prefix as agency name placeholder for Google sign-ins
            const agencyName = displayName || email.split("@")[0];
            await createUserAndAgency(firebaseUser.uid, displayName, email, agencyName);
            userProfile = await getUserProfile(firebaseUser.uid);
          }

          setProfile(userProfile);
        } catch (err) {
          // Rules not yet deployed or network error — fail gracefully
          console.error("Failed to load user profile:", err);
          setProfile(null);
        }
      } else {
        setProfile(null);
      }

      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
