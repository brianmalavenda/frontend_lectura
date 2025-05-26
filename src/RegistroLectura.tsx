import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const tareasProgramadas: Date[] = [];

export function RegistroLectura() {
    // const [diasConLectura, setDiasConLectura] = useState<Date[]>([]);
  // Verifica si una fecha está habilitada (es parte del dataset)
  const isDiaConTarea = (date: Date) => {
    if(tareasProgramadas.length > 0)
    {
      return tareasProgramadas.some((tarea) =>
      date.toDateString() === tarea.toDateString()
      );
    }else{
      return false;
    }
  };

  return (
    <div className="mt-30 rounded-lg ">
      <label className="block font-semibold text-center">Dias con lectura cargada</label>
      <DatePicker
        inline
        selected={new Date()}
        highlightDates={[
            {
            'bg-indigo-500 text-white rounded-full': tareasProgramadas
            }
        ]}
        filterDate={isDiaConTarea}
      />    
    </div>
  );
}