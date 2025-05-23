import axios from "../../api/axios";
import type { LecturaDto } from "../model/lecturaDto";

export const getLecturaFromUser = async (userId:string) => axios.get(`/lectura/${userId}`);

export const guardarLecturaDeUsuario = async (lectura:LecturaDto) => axios.post(`/lectura`, lectura);