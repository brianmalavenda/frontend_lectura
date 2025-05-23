import { FaEnvelope, FaLock, FaBeer  } from "react-icons/fa";
import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useAuthContext } from "../context/AuthContext";
import type { UserAuth } from "../model/user-auth";
import '../../styles/customColors.css';

function Registracion() {
   const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<UserAuth>()
    const { signup, user, isRegister, isAuthenticated } = useAuthContext(); 
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<UserAuth> = async(data) => {
       const userRegister = await signup(data);
       if(userRegister)
        console.log(`Usuario ${userRegister} registrado`);
      else
        console.log("Falló la registración del usuario");
    }

    useEffect(() => {    
    if (isRegister && !isAuthenticated) {
      navigate('/login');
    }
  }, [isRegister, isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-3">
      <div className="mb-1">
        <img src={logo} alt="Logo" className="w-50 h-auto"/>
      </div>
      <div className="w-full max-w-md bg-transparent">
        {/* Logo y encabezado */}
        <div className="text-center mb-6">
          <h2 className="text-2xl bg-azul-titulo text-white">Registracion</h2>
        </div>

        {/* Formulario */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <div className="relative">
            <FaBeer className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="usuario"
              className="w-full bg-gris-claro  py-2 pl-10 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-azul-medio placeholder:text-gray-400 font-extralight"
               {...register("username", { required: true })}
            />
            {errors.username && <span className="text-red-400">Debe poner su username</span>}
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="usuario@gmail.com"
              className="w-full bg-gris-claro py-2 pl-10 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-azul-medio placeholder:text-gray-400 font-extralight"
              {...register("email", { required: true })}
            />            
            {errors.email && <span className="text-red-400">Debe poner su email</span>}
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-gris-claro py-2 pl-10 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-azul-medio placeholder:text-gray-400"
              {...register("password", { required: true })}
            />
            {errors.password && <span className="text-red-400">Debe poner su password</span>}
          </div>

          {/* Botón de Login */}
          <button
            type="submit"
            className="w-full bg-azul-oscuro hover:bg-azul-oscuro transition-colors py-2 rounded-md text-white font-semibold text-sm shadow"
          >
            REGISTRAR
          </button>

          {/* Registro */}
          <a className="text-center text-sm font-azul-oscuro mt-2" href="/login">
            Iniciar sesion
          </a>
        </form>
      </div>
    </div>
  );
}

export default Registracion;