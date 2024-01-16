import {Weather} from "./weather";

import axios, {
  AxiosResponse,
  AxiosRequestConfig
} from "axios";

export type Forecast = {
  weatherList: Weather[];
}

/**
 * Sends a request to the forecast API.
 *
 * @param {AxiosRequestConfig} requestConfig - The configuration for the request.
 * @returns {Promise<AxiosResponse<Forecast>>} - A promise that resolves to the response from the forecast API.
 */
export const getForecastApi = async (requestConfig: AxiosRequestConfig): Promise<AxiosResponse<Forecast>> => {
  return await axios.request<Forecast>(requestConfig)
}