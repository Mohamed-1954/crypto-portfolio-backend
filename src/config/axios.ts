import axios, { type AxiosError, type AxiosInstance } from "axios";
import config from "./config";

const axiosClient: AxiosInstance = axios.create({
  baseURL: config.coinMarketCap.apiUrl,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
    "Content-Type": ["application/json"],
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    console.log("Request initiated ", config);
    return config;
  },
  (error: AxiosError) => {
    console.error("Request error", error);
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    console.log("Response received", response);
    return response;
  },
  (error: AxiosError) => {
    console.error("Response error", error);
    return Promise.reject(error);
  }
);

export default axiosClient;
