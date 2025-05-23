import { createContext, useContext, useState, useEffect} from 'react';
import type { ReactNode } from 'react';
import tareasProgramadas from '../../data/tareasProgramadas.json';
import { getLecturaFromUser } from '../api/lectura';
import { registerRequest, loginRequest, verifyTokenRequest } from '../api/auth';
import Cookies from 'js-cookie';
import type { UserAuth } from "../model/user-auth";

export const AuthContext = createContext<UserAuth>({
  username: "",
  email: "",
  token: "",
  setLectura: () => {},
});

export const useAuth = () => {
  const context = useContext<UserAuth>(AuthContext);
  
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  // clear errors after 5 seconds
//   useEffect(() => {
//     if (errors.length > 0) {
//       const timer = setTimeout(() => {
//         setErrors([]);
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [errors]);

  const signup = async (user:UserAuth) => {
    try {
      const res = await registerRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error: {response: { data: { message: string }}}) {
      console.log(error.response.data);
      setErrors(error.response.data.message);
    }
  };

  const signin = async (user: UserAuth) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      // setErrors(error.response.data.message);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log(res);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        logout,
        isAuthenticated,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;