import {RegistroLectura} from './lectura/pages/RegistroLectura.tsx'
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Login from './authenticacion/pages/Login.tsx'
import Registracion from './authenticacion/pages/Registracion.tsx'
import LoadingLanding from './landing/pages/LoadingLanding.tsx';
import {AuthProvider} from './authenticacion/context/AuthContext.tsx';
import {LecturaProvider} from './lectura/context/LecturaContexto.tsx';
import {ProtectedRoute} from './authenticacion/pages/routes.tsx'
import './styles/customColors.css';
import './styles/customFonts.css';

function App() {
  return (
    <AuthProvider>
      <LecturaProvider>
        <BrowserRouter>
        <div className="bg-mostaza min-h-screen text-white flex flex-col items-center py-3 font-open-sans">    
              <Routes>
              <Route path="/login" element={<Login/>} />
              <Route path="/registracion" element={<Registracion/>} />                
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<RegistroLectura />} />
                <Route path="/loadlanding" element={<LoadingLanding />} />
              </Route>
              </Routes>
        </div>
        </BrowserRouter>
        </LecturaProvider>
    </AuthProvider>
  )
}

export default App
