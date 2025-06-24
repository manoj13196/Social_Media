import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
const storedUser = localStorage.getItem("user");
const getuser =
  storedUser !== undefined && storedUser !== null
    ? JSON.parse(storedUser)
    : null;
const [user, setUser] = useState(getuser);

const storedToken = localStorage.getItem("token");
const gettoken =
  storedToken !== undefined && storedToken !== null
    ? (storedToken)
    : null;
const [token, setToken] = useState(gettoken);

  const login = ({ user, token }) => {
    console.log(user,token)
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};
