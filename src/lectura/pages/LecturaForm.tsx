import { useEffect, useState } from 'react';
import ClarinIcon from '../../assets/clarin-icon.svg?react';
import LaNacionIcon from '../../assets/ln-icon.svg?react';
import P12Icon from '../../assets/p12-icon.svg?react';
import HTVIcon from '../../assets/HTV.svg?react';
import XHIcon from '../../assets/xinhua.svg?react';
import TSIcon from '../../assets/telesur.svg?react';
import CDIcon from '../../assets/cubadebate.svg?react';
import EJESIcon from '../../assets/ejes.svg?react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLecturaContext } from '../context/LecturaContexto';
import type { Diario } from '../model/diario';
import { getDiarios } from '../api/diario';
import { saveLecturaFromUser } from '../api/lectura';
import {verifyTokenRequest} from '../../authenticacion/api/auth.ts';
import type { UserAuth } from '../../authenticacion/model/user-auth.ts';

interface OpcionLecturaType {
  id: string,
  value: string,
  label: string,
  IconComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

export function LecturaForm() {
  const { lectura, setLectura } = useLecturaContext();
  const [checkSeleccionados, setCheckSeleccionados] = useState<string[]>([]);
  const [dateSeleccionada, setDateSeleccionada] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [diarios, setOpcionesDiarios] = useState<OpcionLecturaType[]>([]);

  const getIcon = (sigla: string) => {
    let result: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

    switch (sigla) {
      case "P12":
        result = P12Icon
        break;
      case "LN":
        result = LaNacionIcon
        break;
      case "CL":
        result = ClarinIcon
        break;
      case "HTV":
        result = HTVIcon
        break;
      case "XH":
        result = XHIcon
        break;
      case "TS":
        result = TSIcon
        break;
      case "CD":
        result = CDIcon
        break;
      case "EJES":
        result = EJESIcon
        break;
      default:
        result = () => null;
    }

    return result;
  }

  let diariosFromBD: Diario[] = [];
  let dataset: Date[] = [];
  let userAuthorized:any = null

   useEffect(() => {
    const isAuhtorized = async() => {
      userAuthorized = (await verifyTokenRequest()).data;
    }
    
    isAuhtorized();
    console.log(userAuthorized);
  }, []);

  lectura.forEach((tarea: string) => {
    dataset.push(new Date(tarea));
  });

  useEffect(() => {
    const nuevasFechas = lectura.map((tarea: string) => new Date(tarea));
    dataset = nuevasFechas;
  }, [lectura])

  useEffect(() => {
    const getDataToInit = async () => {
      diariosFromBD = (await getDiarios()).data;

      if (!(diarios.length > 0)) {
        diariosFromBD.map(item => {
          diarios.push(
            {
              id: item.id,
              value: item.name,
              label: item.name,
              IconComponent: getIcon(item.sigla)
            }
          )
        });
        setOpcionesDiarios(diarios);
      }
    };

    getDataToInit();
  });


  const handleChangeChecks = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setCheckSeleccionados((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const idsSeleccionados = diarios
      .filter(d => checkSeleccionados.includes(d.value))
      .map(d => d.id);

    console.log(idsSeleccionados);
      
    setLectura((prevLectura) => {
      const nuevaLectura = [...prevLectura, dateSeleccionada.toISOString()];
      return nuevaLectura;
    });

    // saveLecturaFromUser(idsSeleccionados)
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
        {diarios.map((opcion) => {
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
                peer-checked:border-green-600 dark:peer-checked:border-green-500`}>
                <div className="block text-center w-full">
                  <Icon
                    className="w-8 h-8 sm:w-10 sm:h-10 mb-2 inline-block text-gray-500"
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

