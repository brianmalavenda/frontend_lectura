import {RegistroLectura} from './lectura/pages/RegistroLectura.tsx'
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Login from './authenticacion/pages/Login.tsx'
import Registracion from './authenticacion/pages/Registracion.tsx'
import Logout from './authenticacion/pages/Logout.tsx'
import LoadingLanding from './landing/pages/LoadingLanding.tsx';
import {AuthProvider} from './authenticacion/context/AuthContext.tsx';
import {LecturaProvider} from './lectura/context/LecturaContexto.tsx';
import {ProtectedRoute} from './authenticacion/pages/routes.tsx'
import Navbar from './navbar/Navbar.tsx';
import './styles/customColors.css';
import './styles/customFonts.css';

function App() {
  return (
    <AuthProvider>
      <LecturaProvider>
        <Navbar></Navbar>
        <BrowserRouter>
        {/* min-h-screen */}
        <div className="bg-mostaza min-h-[calc(100vh-5rem)] flex flex-col items-center py-3 font-open-sans-medium pt-16">    
              <Routes>
              <Route path="/login" element={<Login/>} />
              <Route path="/registracion" element={<Registracion/>} />                
              <Route element={<ProtectedRoute />}>
                <Route path="/inicio" element={<RegistroLectura />} />
                <Route path="/logout" element={<Logout />} />
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
