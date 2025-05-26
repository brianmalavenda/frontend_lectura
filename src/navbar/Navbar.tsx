import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // íconos
import ejesencabezado from '../assets/ejes_encabezado.png';
import { useAuthContext } from '../authenticacion/context/AuthContext'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const {isAuthenticated} = useAuthContext();

  return (
    <nav className="bg-beige text-white fixed w-full z-10 font-open-sans-medium">
      <div className="max-w-7xl mx-auto px-2 py-2 flex justify-between items-center">
        {/* <div className="text-xl font-bold">MiApp</div> */}
        <img src={ejesencabezado} alt="Ejes_encabezado" className="h-8 w-auto" />

        {/* Botón hamburguesa (visible solo en móvil) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Enlaces (escondidos en móvil, visibles en desktop) */}
        {isAuthenticated? 
            (
                <div className="hidden md:flex space-x-6">
                <a href="/inicio" className="text-gray-700 hover:text-blue-600">Home</a>
                <a href="/logout" className="text-gray-700 hover:text-blue-600">Logout</a>
                <a href="/perfil" className="text-gray-700 hover:text-blue-600">Perfil</a>
                </div>
            ):
            (
                <div className="hidden md:flex space-x-6">
                <a href="/inicio" className="text-gray-700 hover:text-blue-600">Login</a>
                <a href="/registracion" className="text-gray-700 hover:text-blue-600">Registracion</a>
                </div>
            )
        }
        
        </div>

      {/* Menú desplegable en móvil */}
      {isOpen && 
        (<div className="md:hidden px-4 pb-4 space-y-2">
            { isAuthenticated? 
            (
                <>
                <a href="/inicio" className="block text-gray-700 hover:text-blue-600">Home</a>
                <a href="/logout" className="block text-gray-700 hover:text-blue-600">Logout</a>
                <a href="/perfil" className="block text-gray-700 hover:text-blue-600">Perfil</a>
                </>
            ):
            (
                <>
                <a href="/inicio" className="block text-gray-700 hover:text-blue-600">Login</a>
                <a href="/registracion" className="block text-gray-700 hover:text-blue-600">Registracion</a>
                </>
            )
            }
            </div>
            )
      }
    </nav>
  );
};

export default Navbar;
