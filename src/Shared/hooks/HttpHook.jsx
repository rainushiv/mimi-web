import { useState, useCallback, useRef, useEffect } from "react"
export default function useHttpClient() {

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState()

    const activeHttpRequests = useRef([])

    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setIsLoading(true);
        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrl)

        try {
            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortCtrl.signal

            });

            const responseData = await response.json();

            activeHttpRequests.current = activeHttpRequests.current.filter(currReq => currReq !== httpAbortCtrl)


            if (!response.ok) {
                throw new Error(responseData.message)
            }


            setIsLoading(false)
            return responseData
        } catch (err) {
            setIsError(err.message)
            setIsLoading(false)
            throw err
        }
    }, [])

    const clearError = () => {
        setIsError(null);

    }

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())

        }

    }, [])
    return (
        { isLoading, isError, sendRequest, clearError }
    )

}