import { FaEnvelope, FaLock, FaBeer  } from "react-icons/fa";
import logo from '../assets/logo.png';

<img src={logo} alt="Logo" className="..." />

function Registracion() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 px-6">
      <div className="w-full max-w-md bg-transparent text-white">
        {/* Logo y encabezado */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold">Registracion</h2>
        </div>

        {/* Formulario */}
        <form className="space-y-6">
          {/* Username */}
          <div className="relative">
            <FaBeer className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="usuario"
              className="w-full bg-zinc-500 text-white py-2 pl-10 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="usuario@gmail.com"
              className="w-full bg-zinc-500 text-white py-2 pl-10 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full bg-zinc-500 text-white py-2 pl-10 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400"
            />
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