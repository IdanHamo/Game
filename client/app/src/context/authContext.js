import React, { useEffect, useState } from "react";
import httpService from "../services/httpservice";
import usersService from "../services/users";

const authContext = React.createContext(null);

authContext.displayName = "Auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(usersService.getUser());

  useEffect(() => {
    refreshUser();
  });

  const refreshUser = () => {
    setUser(usersService.getUser());
  };

  const login = async (details) => {
    const { response } = await usersService.loginUser(details);
    refreshUser();
    return response;
  };

  const getFullUser = async () => {
    const userId = usersService.getUser();
    const { data } = await httpService.get("/auth/user", userId);
    console.log(data);
  };
  const logout = async () => {
    usersService.logoutUser();
    refreshUser();
  };

  return (
    <authContext.Provider value={{ user, login, getFullUser, logout }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(authContext);
};
