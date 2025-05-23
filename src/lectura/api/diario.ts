import axios from "../../api/axios";

export const getDiarios = async () => axios.get(`/diario`);

export const getDiarioFromSigla = async (sigla:string) => axios.get(`/diario/sigla/${sigla}`);