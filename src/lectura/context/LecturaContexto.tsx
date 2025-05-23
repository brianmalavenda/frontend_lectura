import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';
import tareasProgramadas from '../../data/tareasProgramadas.json';
import { getLecturaFromUser } from '../api/lectura';

interface LecturaContextType {
  lectura: string[];
  setLectura: React.Dispatch<React.SetStateAction<string[]>>;
  getLectura: (id: string | null) => Promise<string[]>;
}
const LecturaContext = createContext<LecturaContextType>({
  lectura: [],
  setLectura: () => {},
  getLectura: async (_id: string | null) => {
    throw new Error("getLectura function must be overridden by LecturaProvider");
  },
});

export const useLecturaContext = () => {
  const context = useContext(LecturaContext);
  if (context === undefined) throw new Error("useLecturaContext debe ser usado dentro de LecturaProvider");
  return context;
};

export const LecturaProvider = ({ children }: { children: ReactNode }) => {
  // Obtengo la lectura del usuario 
  const [lectura, setLectura] = useState<string[]>([]);

  // const getLectura = async(userId: string) => {
  //   const res = await getLecturaFromUser(userId);
  //   try{
  //     setLectura(res.data);
  //     return res.data;
  //   }catch(e){
  //     console.log(e);
  //   }
  // }

  const getLectura = async (id: string | null): Promise<string[]> => {
    if (!id) {
      throw new Error("id is required for getLectura");
    }
    const res = await getLecturaFromUser(id);
    setLectura(res.data);
    return res.data;
  }

  return (
    <LecturaContext.Provider 
      value={{ 
        lectura, 
        setLectura, 
        getLectura
        }}>
      {children}
    </LecturaContext.Provider>
  );
};

export default LecturaContext;