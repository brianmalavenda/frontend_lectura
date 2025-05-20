import { useEffect,useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {LecturaForm} from './LecturaForm.tsx'
import { useLecturaContext } from '../context/LecturaContexto.tsx';
import {verifyTokenRequest} from '../../authenticacion/api/auth.ts';
import {getLecturaFromUser} from '../api/lectura.ts';

// { dataset }: { dataset: Date[] }
export function RegistroLectura() {
    // const [diasConLectura, setDiasConLectura] = useState<Date[]>([]);
  // Verifica si una fecha está habilitada (es parte del dataset)
    const { lectura, getLectura } = useLecturaContext();
     const [dataset, setDataset] = useState<Date[]>([]);

  useEffect(() => {
    const isAuhtorized = async() => {
      const userAuthorized = (await verifyTokenRequest()).data;
       await getLectura(userAuthorized.id);
      // const lecturaUsuario = (await getLecturaFromUser(userAuthorized.id)).data;
      // const lecturaUsuario = await getLectura(userAuthorized.id);
      // if(lecturaUsuario.length>0) 
      //   setLectura(lecturaUsuario);
    };
    isAuhtorized();
  }, []); // se ejecuta si dataset cambia

  useEffect(()=>{
    // lectura.forEach((tarea: string) => {
    //   dataset.push(new Date(tarea));
    // });
    const nuevasFechas = lectura.map((tarea: string) => new Date(tarea));
    setDataset(nuevasFechas);

    console.log("lectura en el useEffect de lectura:", dataset);
  }, [lectura])

  const isDiaConTarea = (date: Date) => {
    return lectura.some((tarea:string) =>
      date.toDateString() === tarea
    );
  };

  return (
    <div className="mt-30 rounded-lg ">
      <label className="block font-semibold text-center">Dias con lectura cargada</label>
      <DatePicker
        inline
        selected={new Date()}
        highlightDates={[
            {
            'bg-indigo-500 text-white rounded-full': dataset
            }
        ]}
        filterDate={isDiaConTarea}
      />    
      <LecturaForm/>
    </div>
  );
}