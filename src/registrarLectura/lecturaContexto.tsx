import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import tareasProgramadas from '../data/tareasProgramadas.json';

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
export const LecturaProvider = ({ children }: { children: ReactNode }) => {
  const [lectura, setLectura] = useState<string[]>(tareasProgramadas.diasConLectura);

  return (
    <LecturaContext.Provider value={{ lectura, setLectura }}>
      {children}
    </LecturaContext.Provider>
  );
};
