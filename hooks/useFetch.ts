import {useEffect, useState} from "react"

interface UseFetchOutput <T> {
    data: T
    isLoading: boolean
    error: unknown
    reFetch: () => void
}

/**
 * A custom hook for fetching data from an API.
 *
 * @template T - The type of data returned by the API.
 * @param {Promise<T>} request - The promise that fetches the data.
 * @returns {UseFetchOutput<T>} An object containing the fetched data, loading state, error state, and a function to refetch the data.
 */
const useFetch = <T>(request: Promise<T>): UseFetchOutput<T> => {

    const [data, setData] = useState<T | undefined>(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<unknown>(null)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setIsLoading(true)
        setError(null)

        try {
            console.log("SERVER URL: ", process.env.EXPO_PUBLIC_BACKEND_SERVER_URL)
            const response = await request
            setData(response)
            setIsLoading(false)
        } catch (error) {
            setError(error)
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const reFetch = async () => {
        setIsLoading(true)
        await fetchData()
    }

    return {
        data: data!,
        isLoading,
        error,
        reFetch: reFetch
    }
}

export default useFetch
