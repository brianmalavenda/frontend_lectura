import { createContext, useContext, useState} from 'react';
import type { ReactNode } from 'react';
import { registerRequest, loginRequest } from '../api/auth';
import type { UserAuth } from "../model/user-auth";

// Necesito crear una interface para tipar el contexto
interface AuthContextType {
  user: string | null;
  signup: (user: UserAuth) => Promise<any>;
  signin: (user: UserAuth) => Promise<any>;
  isAuthenticated: boolean;
  isRegister: boolean;
  errors: string[];
  // loading: boolean;
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
  // const [loading, setLoading] = useState(false);

  const signup = async (userRegistracion: UserAuth) => {
    // setLoading(true);
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
    // finally {
    //   setLoading(false);
    // }
  };

  const signin = async (userLogin: UserAuth) => {
    // setLoading(true);
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
    // finally {
      // setLoading(false);
    // }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        isAuthenticated,
        isRegister,
        errors,
        // loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
