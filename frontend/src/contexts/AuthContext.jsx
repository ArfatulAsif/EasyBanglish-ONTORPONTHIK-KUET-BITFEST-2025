import { createContext, useState, useEffect } from "react";
import {
  isUserAuthenticated,
  login,
  logoutUser,
  register,
} from "../services/authServices";
import toast from "react-hot-toast";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      const authStatus = await isUserAuthenticated();
      setIsAuth(isUserAuthenticated()); // Check if token exists
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const registerUser = async (name, email, password) => {
    if (!name || !email || !password) {
      toast.error("Please provide all required fields!");
    }

    const newUser = await register(name, email, password);

    return newUser;
  };

  const loginUser = async (email, password) => {
    if (!email || !password) {
      toast.error("Please provide all required fields!");
    }

    const user = await login(email, password);

    setUser(user);
    setIsAuth(true);

    return user;
  };

  const logout = () => {
    setUser(null);
    setIsAuth(false);
    logoutUser();
  };

  return (
    <AuthContext.Provider
      value={{ isAuth, isLoading, user, registerUser, loginUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
