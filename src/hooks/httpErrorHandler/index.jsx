import {useState, useEffect} from 'react'

const useHttpErrorHandler = (axios) => {
    const [error, setError] = useState(null)
    let reqInterceptor = axios.interceptors.request.use(request => {
        setError(null)
        return request
    })
    let resInterceptor = axios.interceptors.response.use(res => res, err => {
        setError(err)
    })

    useEffect(() => {
        return () => {
            axios.interceptors.request.eject(reqInterceptor)
            axios.interceptors.response.eject(resInterceptor)
        }
    }, [reqInterceptor, resInterceptor])

    function dismissModal() { setError(null) }

    return [error, dismissModal]
}

export default useHttpErrorHandler