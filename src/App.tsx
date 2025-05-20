import {RegistroLectura} from './lectura/pages/RegistroLectura.tsx'
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Login from './authenticacion/pages/Login.tsx'
import Registracion from './authenticacion/pages/Registracion.tsx'
import LoadingLanding from './landing/pages/LoadingLanding.tsx';
import {AuthProvider} from './authenticacion/context/AuthContext.tsx';
import {LecturaProvider} from './lectura/context/LecturaContexto.tsx';

function App() {
  return (
    <AuthProvider>
      <LecturaProvider>
      <div className="bg-zinc-800 h-screen text-white flex flex-col items-center justify-center">
          <div className="bg-gray-950 p-4 w-11/12 rounded-lg flex flex-col items-center">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<RegistroLectura />} />
                <Route path="/loadlanding" element={<LoadingLanding />} />
                <Route path="/login" element={<Login/>} />
                <Route path="/registracion" element={<Registracion/>} />                
              </Routes>
            </BrowserRouter>
          </div>
        </div>
        </LecturaProvider>
    </AuthProvider>
  )
}

export default App