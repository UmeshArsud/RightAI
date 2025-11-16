import React, { createContext, useContext, useState, useEffect } from 'react';

//must match to SignInResponse.java DTO
interface UserData {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  userData: UserData | null;
  login: (data: UserData) => void; //function
  logout: () => void; //function
}

// We add "!" to tell TypeScript, provide a value later
const AuthContext = createContext<AuthContextType>(null!);

// 4. Create a custom hook "useAuth()" to easily access the context
export function useAuth() {
  return useContext(AuthContext);
}

// 5. Create the AuthProvider component
// This component will wrap your entire application
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  // 6. Check localStorage when the app first loads
  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  // 7. Login Function
  const login = (data: UserData) => {
    // Save to state
    setUserData(data);
    // Save to localStorage (so it persists on refresh)
    localStorage.setItem('userData', JSON.stringify(data));
  };

  // 8. Logout Function
  const logout = () => {
    // Clear state
    setUserData(null);
    // Clear from localStorage
    localStorage.removeItem('userData');
  };

  // 9. Provide the values to all children components
  const value = {
    userData,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};