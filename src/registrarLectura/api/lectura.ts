import axios from "../../api/axios";

type Lectura = {
  email: string
  password: string
}

export const getLecturaFromUser = async (email:string) => axios.get(`/registrarlectura/${email}`);