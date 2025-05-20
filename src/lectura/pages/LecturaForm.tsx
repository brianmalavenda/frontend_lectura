import { useContext, useState } from 'react';
import ClarinIcon from '../../assets/clarin-icon.svg?react';
import LaNacionIcon from '../../assets/ln-icon.svg?react';
import P12Icon from '../../assets/p12-icon.svg?react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useLecturaContext} from '../context/LecturaContexto';


const opcionesDeLectura = [
  {
    id: 'clarin-option',
    value: 'Clarin', // Este valor se guardará en el estado 'seleccionados'
    label: 'Clarin',
    IconComponent: ClarinIcon,
  },
  {
    id: 'ln-option',
    value: 'LaNacion',
    label: 'La Nacion',
    IconComponent: LaNacionIcon
  },
  {
    id: 'p12-option',
    value: 'Pagina12',
    label: 'Pagina12',
    IconComponent: P12Icon
  },
  // Agrega más opciones aquí
];
// { dataset }: { dataset: Date[] }
export function LecturaForm() {
  const { lectura, setLectura } = useLecturaContext();
  const [checkSeleccionados, setCheckSeleccionados] = useState<string[]>([]);
  const [dateSeleccionada, setDateSeleccionada] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

    let dataset: Date[] = [];
  lectura.forEach((tarea: string) => {
    dataset.push(new Date(tarea));
  });


  const handleChangeChecks = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setCheckSeleccionados((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aca se actualiza el estado de la lectura a traves del contexto
    setLectura((prevLectura) => {
      const nuevaLectura = [...prevLectura, dateSeleccionada.toISOString()];
      console.log('Nueva lectura:', nuevaLectura);
      return nuevaLectura;
    }
    );
  };

  const handleDateChange = (date: Date | null) => {    
    setShowPicker(false); //siempre que hay un cambio de fecha, se cierra el picker entonces no quiero mostrar el div de fondo
    if (date) {
      setDateSeleccionada(date);
    }
  }

    const isDiaConTarea = (date: Date) => {
    return !dataset.some((tarea) =>
      date.toDateString() == tarea.toDateString()
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-lg font-semibold text-center block my-2 text-white">
        Cargar nueva lectura
      </h1>

      {/* <div className="mb-4 p-2 border rounded-lg w-full"> */}
      <label className="block text-gray-500 text-sm item-center justify-center font-semibold mb-2">
        Fecha de lectura
      </label>
      {/* un div para blurear el fondo */}
      {showPicker && (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"></div>
      )}
      <div className="relative z-50">
      <DatePicker
        selected={dateSeleccionada}
        onChange={handleDateChange}
        className="border border-gray-300 rounded px-2 py-1 my-2 w-full item-center justify-center"
        maxDate={new Date()}
        filterDate={isDiaConTarea}
        placeholderText="Seleccione una fecha"
        onCalendarOpen={() => setShowPicker(true)}
        onCalendarClose={() => setShowPicker(false)} 
        />
      </div>


      <ul className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
        {opcionesDeLectura.map((opcion) => {
          // Extraer el componente de ícono específico para este ítem
          const Icon = opcion.IconComponent;
          const isChecked = checkSeleccionados.includes(opcion.value);

          return (
            <li key={opcion.id} className="flex items-center">
              <input
                type="checkbox"
                id={opcion.id}
                value={opcion.value}
                className="hidden peer"
                onChange={handleChangeChecks}
                checked={isChecked}
              />
              <label
                htmlFor={opcion.id}
                className={`inline-flex items-center justify-between w-full p-4 md:p-5 text-gray-500 bg-white border-2 rounded-lg cursor-pointer
                           dark:hover:text-gray-300 dark:border-gray-700 hover:text-gray-600 hover:bg-gray-50
                           dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700
                           ${isChecked
                    ? 'border-blue-600 dark:border-blue-500 peer-checked:text-blue-600 dark:peer-checked:text-blue-400'
                    : 'border-gray-200'
                  }
                           peer-checked:border-blue-600 dark:peer-checked:border-blue-500
                           peer-checked:text-gray-600 dark:peer-checked:text-gray-300`}
              >
                <div className="block text-center w-full">
                  <Icon
                    className="w-8 h-8 sm:w-10 sm:h-10 mb-2 inline-block"
                    fill="currentColor"
                    aria-hidden="true"
                  />
                </div>
              </label>
            </li>
          );
        })}
      </ul>
      <div className="text-center mt-8">
        <button
          type="submit"

          className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
        >
          Guardar
        </button>
      </div>
      {/* Opcional: Mostrar seleccionados para debug */}
      {/* <div className="mt-4 text-white">
        <p>Seleccionados actualmente: {seleccionados.join(', ')}</p>
      </div> */}
    </form>
  );
}

