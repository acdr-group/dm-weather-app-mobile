import {useEffect, useState} from "react"
import axios from "axios";

const useFetch = <T>(endpoint: string, query?: Record<string, unknown>) => {

    const [data, setData] = useState<T | undefined>(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<unknown>(null)

    useEffect(() => {
        console.log("server_url: ", process.env.EXPO_PUBLIC_BACKEND_SERVER_URL)
        fetchData();
    }, [])

    const options = {
        method: "GET",
        url: `${process.env.EXPO_PUBLIC_BACKEND_SERVER_URL}/${endpoint}`,
        params: { ...query },
    }

    const fetchData = async () => {
        setIsLoading(true)

        try {
            const response = await axios.request(options)
            setData(response.data)
            setIsLoading(false)
        } catch (error) {
            setError(error)
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    const refetch = async () => {
        setIsLoading(true)
        await fetchData()
    }

    return {
        data,
        isLoading,
        error,
        refetch
    }
}

export default useFetch;
