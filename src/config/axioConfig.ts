import { BASE_URL_SERVER } from "@/config/const";
import axios, { AxiosResponse } from "axios";

export const axiosInstance = axios.create({
  baseURL: BASE_URL_SERVER,
  timeout: 15000,
  withCredentials: true,
});

export const bodyResponse = (res: AxiosResponse) => res.data;
