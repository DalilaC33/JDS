import { useState } from 'react'
import Axios from './api'

/** 
 * @description Envía un objeto la API con el método HTTP 'post', no se ejecuta directamente al ser inicializado
 * @param path es la dirección a la cual se realiza la petición
 * @return 'data' respuesta de la api a la petición
 * @return 'loading' es true si la petición a la API se ha realizado y aún no se obtuvo respuesta
 * @return 'error' es el mensaje de error en caso de un fallo ocurrido en el servidor respecto a la petición
 * @return 'statusCode' es el código de estádo emitido por el servidor en respuesta a la petición
 * @return 'fetch' esta función recibe como parámetro al objeto y realiza la petición
 */
const usePut = (path) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [statusCode, setStatusCode] = useState(0)

  const fetch = async (object, id) => {
    setLoading(true)
    setStatusCode(0)
    try {
      const { data: response, status } = await Axios.put(`${path}/${id}`, object, { validateStatus: false })
      setData(response)
      setStatusCode(status)
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  return { data, loading, error, statusCode, fetch }
}

export default usePut
