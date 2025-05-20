import { FaEnvelope, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import logo from '../../assets/logo.png';
import { useAuthContext } from '../context/AuthContext.js'
import type { UserAuth } from "../model/user-auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAuth>()

  const { signin, user, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<UserAuth> = async (data) => {
    await signin(data);
  }

  useEffect(() => {
    console.log("Usuario logeado ", user);
    if (isAuthenticated) {
      navigate('/loadlanding');
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900 px-6">
      <div className="mb-3">
        <img src={logo} alt="Logo" className="w-50 h-auto" />
      </div>
      <div className="w-full max-w-md bg-transparent text-white">
        {/* Logo y encabezado */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold">Inisiar sesion</h2>
        </div>

        {/* Formulario */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="williamjames@gmail.com"
              className="w-full bg-zinc-500 text-white py-2 pl-10 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400"
              {...register("email", { required: true })}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-zinc-500 text-white py-2 pl-10 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400"
              {...register("password", { required: true })}
            />
          </div>
          {/* errors will return when field validation fails  */}
          {errors.email && <span>Debe poner su email</span>}
          {errors.password && <span>Debe poner su password</span>}

          {/* Botón de Login */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors py-2 rounded-md text-white font-semibold text-sm shadow"
          >
            LOGIN
          </button>

          {/* Registro */}
          <a className="text-center text-sm text-gray-400 mt-2" href="/registracion">
            Crear nuevo usuario
          </a>
        </form>
      </div>
    </div>
  );
}

export default Login;