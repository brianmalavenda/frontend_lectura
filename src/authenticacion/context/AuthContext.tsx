import { createContext, useContext, useEffect, useState} from 'react';
import type { ReactNode } from 'react';
import { registerRequest, loginRequest, logoutRequest, verifyTokenRequest } from '../api/auth';
import type { UserAuth } from "../model/user-auth";
import Cookies from "js-cookie";

// Necesito crear una interface para tipar el contexto
interface AuthContextType {
  user: string | null;
  signup: (user: UserAuth) => Promise<any>;
  signin: (user: UserAuth) => Promise<any>;
  sigOut: () => void;
  isAuthenticated: boolean;
  isRegister: boolean;
  errors: string[];
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe ser usado sin AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const signup = async (userRegistracion: UserAuth) => {
    try {
      const res = await registerRequest(userRegistracion);
      if (res.status === 201) {
        setIsRegister(true);
        setUser(res.data.user); //yo esto lo llamo en el useEffect de Registracion y el usuario esta en esa pagina
        return res.data.user.username;
      }
    } catch (error: any) {
      console.error("Error al registrarse:", error);
      setErrors([error.response?.data?.message || "Error desconocido"]);
    } 
  };

  const signin = async (userLogin: UserAuth) => {
    try {
      const res = await loginRequest(userLogin);
      if(res.data.user)
      {
        setIsAuthenticated(true);
        setUser(res.data.user);
        return res.data.user;
      }
    } catch (error: any) {
      console.error("Error al iniciar sesión:", error);
      setErrors([error.response?.data?.message || "Error desconocido"]);
    } 
  };

    const sigOut = () => {
      Cookies.remove("access-token");
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
          const res = await verifyTokenRequest();

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
        sigOut,
        isAuthenticated,
        isRegister,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
