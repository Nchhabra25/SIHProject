import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { decodeJwtPayload } from "./api";

export type AuthUser = {
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
};

type AuthContextValue = {
  token: string | null;
  user: AuthUser | null;
  signin: (token: string) => void;
  signout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "ecoquest_auth_token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setToken(saved);
    setIsHydrated(true);
  }, []);

  const user = useMemo(() => {
    if (!token) return null;
    const payload = decodeJwtPayload<any>(token);
    if (!payload) return null;
    // Optional: basic expiration handling if exp present
    if (typeof payload.exp === "number") {
      const nowSec = Math.floor(Date.now() / 1000);
      if (payload.exp < nowSec) {
        return null;
      }
    }
    return {
      email: payload.sub,
      role: payload.role,
      firstName: payload.firstName,
      lastName: payload.lastName,
    } as AuthUser;
  }, [token]);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      user,
      signin: (t: string) => {
        setToken(t);
        localStorage.setItem(STORAGE_KEY, t);
      },
      signout: () => {
        setToken(null);
        localStorage.removeItem(STORAGE_KEY);
      },
    }),
    [token, user]
  );

  // Avoid rendering children until hydration is complete to prevent flicker/logout
  if (!isHydrated) return null;
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function hasRole(user: AuthUser | null, roles: string[]): boolean {
  if (!user) return false;
  return roles.includes(user.role);
}
