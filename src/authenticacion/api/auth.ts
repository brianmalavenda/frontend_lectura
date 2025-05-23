import type { UserAuth } from "../model/user-auth";
import axios from "../../api/axios";

export const registerRequest = async (user:UserAuth ) => axios.post(`/auth/register`, user);

export const loginRequest = async (user:UserAuth ) => axios.post(`/auth/login`, user);

export const verifyTokenRequest = async () => axios.get(`/auth/verify`);
