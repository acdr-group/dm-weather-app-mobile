import axios, {
    AxiosResponse,
    AxiosRequestConfig
} from "axios";

export type Weather = {
    cityName: string;
    clouds: number;
    dateTime: Date;
    dateTimeText: string;
    description: string;
    feelsLike: number;
    humidity: number;
    icon: string;
    main: string;
    pressure: number;
    pressureGroundLevel: number;
    pressureSeaLevel: number;
    sunrise: Date;
    sunset: Date;
    temp: number;
    tempMax: number;
    tempMin: number;
    timezone: number;
    visibility: number;
    windSpeed: number;
    windDirection: number;
    windGust: number;
}

/**
 * Makes a request to the weather API and returns the response.
 * @param {AxiosRequestConfig} requestConfig - The configuration for the request.
 * @return {Promise<AxiosResponse<Weather>>} - The response from the weather API.
 */
export const getWeatherApi = async (requestConfig: AxiosRequestConfig): Promise<AxiosResponse<Weather>> => {
    return await axios.request<Weather>(requestConfig)
}