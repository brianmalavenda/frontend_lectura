import { useEffect,useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {LecturaForm} from './LecturaForm.tsx'
import { useLecturaContext } from '../context/LecturaContexto.tsx';
import {verifyTokenRequest} from '../../authenticacion/api/auth.ts';
import '../../styles/customFonts.css';
import 'react-datepicker/dist/react-datepicker.css'; // estilo base
import '../../styles/customDatepicker.css';

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
    <div className='w-full'>
      <label className="block text-center text-white bg-azul-titulo w-full">Dias con lectura cargada</label>
      <div className="flex justify-center">
        <DatePicker
          inline
          highlightDates={[
              {
              'text-white rounded-full bg-azul-medio': dataset
              }
          ]}
          filterDate={isDiaConTarea}  
          className='flex justify-center'
        />    
        </div>
      <LecturaForm/>
    </div>
  );
}