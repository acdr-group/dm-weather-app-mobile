import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { getFromStorage, saveToStorage, isExpired } from '../utils/storageUtil';

const useFetch = <T>(endpoint: string, query?: Record<string, unknown>, cacheKey?: string, expiryMinutes?: number) => {
    const [data, setData] = useState<T | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        console.log("server_url: ", process.env.EXPO_PUBLIC_BACKEND_SERVER_URL);
        checkCacheAndFetchData();
    }, []);

    const options: AxiosRequestConfig = {
        method: "GET",
        url: `${process.env.EXPO_PUBLIC_BACKEND_SERVER_URL}/${endpoint}`,
        params: { ...query },
    };

    const checkCacheAndFetchData = async () => {
        if (cacheKey && expiryMinutes !== undefined) {
            const cachedData = await getFromStorage(cacheKey);
            if (cachedData && !isExpired(cachedData.timestamp, expiryMinutes)) {
                setData(cachedData.data);
                setIsLoading(false);
                return;
            }
        }
        await fetchData();
    };

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options);
            setData(response.data);
            if (cacheKey) {
                await saveToStorage(cacheKey, { data: response.data, timestamp: new Date().getTime() });
            }
            setIsLoading(false);
        } catch (error) {
            setError(error);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const reFetch = async () => {
        setIsLoading(true);
        await fetchData();
    };

    return {
        data,
        isLoading,
        error,
        reFetch: reFetch
    };
};

export default useFetch;
