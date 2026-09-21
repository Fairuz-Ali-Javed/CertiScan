import React, { createContext, useState } from 'react';
import { currentUser, adminUser } from '../data/mockData';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(currentUser);
  const [loading, setLoading] = useState(false);

  const login = async ({ role }) => {
    setLoading(true);
    const selected = role === 'ADMIN' ? adminUser : currentUser;
    setUser(selected);
    setLoading(false);
    return { success: true, user: selected };
  };

  const register = async (regData) => {
    setLoading(true);
    const newApplicant = {
      ...currentUser,
      fullName: regData.fullName || currentUser.fullName,
      email: regData.email || currentUser.email,
      phone: regData.phone || currentUser.phone,
    };
    setUser(newApplicant);
    setLoading(false);
    return { success: true, user: newApplicant };
  };

  const logout = async () => {
    setUser(null);
  };

  const switchRole = (newRole) => {
    const updated = newRole === 'ADMIN' ? adminUser : currentUser;
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};
