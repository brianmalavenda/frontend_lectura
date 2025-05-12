import { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {LecturaForm} from './LecturaForm.tsx'
import { useContext } from 'react';
import { LecturaContext } from './lecturaContexto.tsx';

// { dataset }: { dataset: Date[] }
export function RegistroLectura() {
    // const [diasConLectura, setDiasConLectura] = useState<Date[]>([]);
  // Verifica si una fecha está habilitada (es parte del dataset)
    const { lectura, setLectura } = useContext(LecturaContext);

  let dataset: Date[] = [];
  lectura.forEach((tarea: string) => {
    dataset.push(new Date(tarea));
  });

  useEffect(() => {
    console.log('Dataset actualizado:', lectura);
  }, [lectura]); // se ejecuta si dataset cambia

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