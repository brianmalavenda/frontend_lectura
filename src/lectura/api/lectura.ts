import axios from "../../api/axios";

export const getLecturaFromUser = async (userId:string) => axios.get(`/lectura/${userId}`);