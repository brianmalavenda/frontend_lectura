import {RegistroLectura} from './registrarLectura/pages/RegistroLectura.tsx'
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Login from './authenticacion/pages/Login.tsx'
import Registracion from './authenticacion/pages/Registracion.tsx'

function App() {
  return (
    <>
      <div className="bg-zinc-800 h-screen text-white flex flex-col items-center justify-center">
          <div className="bg-gray-950 p-4 w-11/12 rounded-lg flex flex-col items-center">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<RegistroLectura />} />
                <Route path="/login" element={<Login/>} />
                <Route path="/registracion" element={<Registracion/>} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
    </>
  )
}

export default App