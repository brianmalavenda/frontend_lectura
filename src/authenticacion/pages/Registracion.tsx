import { FaEnvelope, FaLock, FaBeer  } from "react-icons/fa";
import logo from '../../assets/logo.png';
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useAuthContext } from "../context/AuthContext";
import type { UserAuth } from "../model/user-auth";

function Registracion() {
   const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<UserAuth>()
    const {signup, isRegister} = useAuthContext();

    const onSubmit: SubmitHandler<UserAuth> = async(data) => {
       await signup(data);
       console.log("Esta registrado? - ", isRegister);

       if(isRegister)
        window.location.href = '/login';
      else  
        console.log("Falló la registración");
    }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900 px-6">
      <div className="mb-3">
        <img src={logo} alt="Logo" className="w-50 h-auto"/>
      </div>
      <div className="w-full max-w-md bg-transparent text-white">
        {/* Logo y encabezado */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Registracion</h2>
        </div>

        {/* Formulario */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <div className="relative">
            <FaBeer className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="usuario"
              className="w-full bg-zinc-500 text-white py-2 pl-10 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400"
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
              className="w-full bg-zinc-500 text-white py-2 pl-10 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400"
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
              className="w-full bg-zinc-500 text-white py-2 pl-10 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400"
              {...register("password", { required: true })}
            />
            {errors.password && <span className="text-red-400">Debe poner su password</span>}
          </div>

          {/* Botón de Login */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors py-2 rounded-md text-white font-semibold text-sm shadow"
          >
            REGISTRAR
          </button>

          {/* Registro */}
          <a className="text-center text-sm text-gray-400 mt-2" href="/login">
            Iniciar sesion
          </a>
        </form>
      </div>
    </div>
  );
}

export default Registracion;