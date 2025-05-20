import { useEffect,useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {LecturaForm} from './LecturaForm.tsx'
import { useLecturaContext } from '../context/LecturaContexto.tsx';
import {verifyTokenRequest} from '../../authenticacion/api/auth.ts';

export function RegistroLectura() {
    const { lectura, getLectura } = useLecturaContext();
     const [dataset, setDataset] = useState<Date[]>([]);

  useEffect(() => {
    const isAuhtorized = async() => {
      const userAuthorized = (await verifyTokenRequest()).data;
       await getLectura(userAuthorized.id);      
    };
    isAuhtorized();
  }, []);

  useEffect(()=>{
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
        highlightDates={[
            {
            'text-white rounded-full bg-green-500': dataset
            }
        ]}
        filterDate={isDiaConTarea}
      />    
      <LecturaForm/>
    </div>
  );
}