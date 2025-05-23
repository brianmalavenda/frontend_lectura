import { useEffect, useState } from 'react';
import ClarinIcon from '../../assets/clarin-icon.svg?react';
import LaNacionIcon from '../../assets/ln-icon.svg?react';
import P12Icon from '../../assets/p12-icon.svg?react';
import HTVIcon from '../../assets/HTV.svg?react';
import COHETEIcon from '../../assets/cohete-icon.svg?react';
import XHIcon from '../../assets/xinhua.svg?react';
import TSIcon from '../../assets/telesur.svg?react';
import CDIcon from '../../assets/cubadebate.svg?react';
import EJESIcon from '../../assets/ejes.svg?react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLecturaContext } from '../context/LecturaContexto';
import type { DiarioDto } from '../model/diarioDto.ts';
import type { LecturaDto } from '../model/lecturaDto.ts';
import { getDiarios } from '../api/diario';
import { guardarLecturaDeUsuario } from '../api/lectura.ts';
import {verifyTokenRequest} from '../../authenticacion/api/auth.ts';
import '../../styles/customColors.css';
import '../../styles/customFonts.css';
import 'react-datepicker/dist/react-datepicker.css'; // estilo base
import '../../styles/customDatepicker.css';

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
      case "COH":
        result = COHETEIcon
        break;
      default:
        result = () => null;
    }

    return result;
  }

  let diariosFromBD: DiarioDto[] = [];
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
    const guardarLecturayActualizarEstado = async() => {
      e.preventDefault();
      const idsSeleccionados = diarios
        .filter(d => checkSeleccionados.includes(d.value))
        .map(d => d.id);
        
      setLectura((prevLectura) => {
        const nuevaLectura = [...prevLectura, dateSeleccionada.toISOString()];
        return nuevaLectura;
      });

      try {
        await Promise.all(
          idsSeleccionados.map(async (id) => {
            const lecturaObject: LecturaDto = {
              diario_id: id,
              fecha: dateSeleccionada
            };
            console.log("lecturaObject -- diario_id", lecturaObject.diario_id, "  - fecha: ", lecturaObject.fecha);

            await guardarLecturaDeUsuario(lecturaObject);
          })
        );
      } catch (e) {
        console.error(e);
      }
    }

    guardarLecturayActualizarEstado();
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
      <h1 className="text-center block my-2 text-white bg-azul-titulo w-full">
        Cargar nueva lectura
      </h1>

      {/* Contenedor centrado */}
      <div className="flex justify-center">
        <div className="w-full max-w-md px-4">
      <label className="flex justify-center font-open-sans-medium mb-2 font-extralight">
        Fecha de lectura
      </label>
      {/* un div para blurear el fondo */}
      {showPicker && (
        <div className="fixed inset-0 text-gray-600 backdrop-blur-sm z-40"></div>
      )}

      <div className="flex justify-center relative z-50">
        <DatePicker
          selected={dateSeleccionada}
          onChange={handleDateChange}
          className="flex justify-center rounded bg-gris-claro px-2 py-1 my-2 w-full focus:outline-none focus:ring-2 focus:ring-azul-medio placeholder:text-gray-400"
          maxDate={new Date()}
          filterDate={isDiaConTarea}
          placeholderText="Seleccione una fecha"
          onCalendarOpen={() => setShowPicker(true)}
          onCalendarClose={() => setShowPicker(false)}
        />
      </div>


      {/* <ul className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3"> */}
      <ul className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 justify-items-center mt-4">

        {diarios.map((opcion) => {
          // Extraer el componente de ícono específico para este ítem
          const Icon = opcion.IconComponent;
          const isChecked = checkSeleccionados.includes(opcion.value);

          return (
            <li key={opcion.id} className="flex justify-center">
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
                className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                  isChecked ? "bg-azul-medio border-azul-medio" : "bg-white border-gray-300"
                } cursor-pointer peer-checked:border-azul-medio`}>
                  <Icon
                    className="w-6 h-6 sm:w-8 sm:h-8"
                    fill="currentColor"
                    aria-hidden="true"
                  />
              </label>
            </li>
          );
        })}
      </ul>
      <div className="text-center mt-8">
        <button
          type="submit"

          className="px-6 py-3 text-white bg-azul-oscuro hover:bg-azul-oscuro rounded-lg font-semibold"
        >
          Guardar
        </button>
      </div>
      </div>
      </div>
      {/* Opcional: Mostrar seleccionados para debug */}
      {/* <div className="mt-4 text-white">
        <p>Seleccionados actualmente: {seleccionados.join(', ')}</p>
      </div> */}
    </form>
  );
}
