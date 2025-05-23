import { FaEnvelope, FaLock } from "react-icons/fa";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 px-6">
      <div className="w-full max-w-md bg-transparent text-white">
        {/* Logo y encabezado */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold">Inisiar sesion</h2>
        </div>

        {/* Formulario */}
        <form className="space-y-6">
          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="williamjames@gmail.com"
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