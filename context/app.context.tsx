"use client";
import { accessToken } from "@/lib/http";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface UserProfile {
  name: string;
  id: string;
  email: string;
}

interface UserContextType {
  setProfile: (profile: UserProfile) => void;
  getProfile: () => UserProfile | null;
  isAuthenticated: () => boolean;
  deleteProfile: () => void;
}

// Tạo một Context với kiểu UserContextType
const UserContext = createContext<UserContextType>({
  setProfile: () => {},
  getProfile: () => null,
  isAuthenticated: () => false,
  deleteProfile: () => {},
});

interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({
  children,
  inititalAccessToken = "",
}: {
  children: React.ReactNode;
  inititalAccessToken?: string;
}): JSX.Element {
  const [profile, setProfileState] = useState<UserProfile | null>(null);
  useState(() => {
    if (typeof window !== "undefined") {
      accessToken.value = inititalAccessToken;
    }
  });
  useEffect(() => {
    const profileData = localStorage.getItem("profile");
    if (profileData !== undefined || profileData !== null) {
      setProfileState(JSON.parse(profileData as string));
    }
  }, []);

  const setProfile = (profile: UserProfile) => {
    localStorage.setItem("profile", JSON.stringify(profile));
    setProfileState(profile);
  };

  const deleteProfile = () => {
    localStorage.removeItem("profile");
    setProfileState(null);
  };

  const getProfile = (): UserProfile | null => {
    const profileData = localStorage.getItem("profile");
    return profileData ? JSON.parse(profileData) : null;
  };

  const isAuthenticated = (): boolean => {
    return profile !== null;
  };

  return (
    <UserContext.Provider
      value={{ deleteProfile, setProfile, getProfile, isAuthenticated }}
    >
      <> {children} </>
    </UserContext.Provider>
  );
}

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
