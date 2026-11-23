import {
  useCallback,
  useEffect,
  useState
} from "react"

function usePeticion(funcion) {
  const [datos, setDatos] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [intento, setIntento] = useState(0)

  const reintentar = useCallback(() => {
    setIntento((actual) => actual + 1)
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    let vigente = true

    async function ejecutar() {
      setCargando(true)
      setError(null)

      try {
        const respuesta = await funcion(controller.signal)

        if (vigente) {
          setDatos(respuesta)
        }
      } catch (errorPeticion) {
        if (
          vigente &&
          errorPeticion.name !== "AbortError"
        ) {
          setError(errorPeticion.message)
        }
      } finally {
        if (vigente) {
          setCargando(false)
        }
      }
    }

    ejecutar()

    return () => {
      vigente = false
      controller.abort()
    }
  }, [funcion, intento])

  return {
    datos,
    cargando,
    error,
    reintentar
  }
}

export default usePeticion
