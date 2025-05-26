import type { UserAuth } from "../model/user-auth";
import axios from "../../api/axios";

export const registerRequest = async (user:UserAuth ) => { return await axios.post(`/auth/registracion`, user)};

export const loginRequest = async (user:UserAuth ) => axios.post(`/auth/login`, user);

export const verifyTokenRequest = async () => axios.get(`/auth/verify`);

export const logoutRequest = async () => axios.get(`/auth/logout`);
