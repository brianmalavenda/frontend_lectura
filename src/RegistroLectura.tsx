import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Dataset simulado con fechas que tienen tareas (formato JS Date o ISO string convertible)
const tareasProgramadas = [
  new Date('2025-05-01'),
  new Date('2025-05-02'),
  new Date('2025-05-03'),
  new Date('2025-05-06'),
  new Date('2025-05-07'),
];

export function RegistroLectura() {
    // const [diasConLectura, setDiasConLectura] = useState<Date[]>([]);
  // Verifica si una fecha está habilitada (es parte del dataset)
  const isDiaConTarea = (date: Date) => {
    return tareasProgramadas.some((tarea) =>
      date.toDateString() === tarea.toDateString()
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
            'bg-indigo-500 text-white rounded-full': tareasProgramadas
            }
        ]}
        filterDate={isDiaConTarea}
      />    
    </div>
  );
}