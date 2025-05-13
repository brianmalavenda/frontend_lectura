import { createContext, useContext, useState} from 'react';
import type { ReactNode } from 'react';
import { registerRequest, loginRequest } from '../api/auth';
import type { UserAuth } from "../model/user-auth";

// Necesito crear una interface para tipar el contexto
interface AuthContextType {
  user: UserAuth | null;
  signup: (user: UserAuth) => Promise<any>;
  signin: (user: UserAuth) => Promise<any>;
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
  const [user, setUser] = useState<UserAuth | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const signup = async (user: UserAuth) => {
    setLoading(true);
    try {
      const res = await registerRequest(user);

      if (res.status === 201) {
        setIsRegister(true)
        return res.data;
      }
    } catch (error: any) {
      console.error("Error al registrarse:", error);
      setErrors([error.response?.data?.message || "Error desconocido"]);
    } finally {
      setLoading(false);
    }
  };

  const signin = async (user: UserAuth) => {
    // await loginRequest(data)
    //   .then((response: { data: { token: string } }) => {        
    //     // Guardar el token en el localStorage        
    //     localStorage.setItem("token", response.data.token);
    //     // Redirigir a la página de inicio
    //     window.location.href = "/";
    //   })
    //   .catch((error: {message: string}) => {
    //     console.error("Error al iniciar sesión:", error);
    //   // Manejar el error de inicio de sesión   
    //   });

    // console.log("esta es la data que voy a logear");
    // console.log(data);

    setLoading(true);
    try {
      const res = await loginRequest(user);
      setUser(res.data.user);
      setIsAuthenticated(true);
      return res.data;
    } catch (error: any) {
      console.error("Error al iniciar sesión:", error);
      setErrors([error.response?.data?.message || "Error desconocido"]);
    } finally {
      setLoading(false);
    }
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
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
