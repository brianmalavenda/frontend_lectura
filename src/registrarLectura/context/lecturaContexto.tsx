import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import tareasProgramadas from '../../data/tareasProgramadas.json';
import { getLecturaFromUser } from '../api/lectura';

type LecturaContextType = {
  lectura: string[];
  setLectura: React.Dispatch<React.SetStateAction<string[]>>;
};

// 1. Crear el contexto
export const LecturaContext = createContext<LecturaContextType>({
  lectura: [],
  setLectura: () => {},
});

// 2. Crear el proveedor
export const LecturaProvider = async({ children }: { children: ReactNode }) => {
  // Obtengo la lectura del usuario 
  await getLecturaFromUser("email");
  const [lectura, setLectura] = useState<string[]>(tareasProgramadas.diasConLectura);

  return (
    <LecturaContext.Provider value={{ lectura, setLectura }}>
      {children}
    </LecturaContext.Provider>
  );
};
