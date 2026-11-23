export async function obtenerDestinos(signal) {
  try {
    const respuesta = await fetch(
      `${import.meta.env.BASE_URL}api/destinos`,
      { signal }
    )

    if (!respuesta.ok) {
      throw new Error(
        `No fue posible obtener los destinos. Error ${respuesta.status}.`
      )
    }

    return await respuesta.json()
  } catch (error) {
    if (error.name === "AbortError") {
      throw error
    }

    throw new Error(
      "No fue posible conectar con el servicio de destinos. Intenta nuevamente."
    )
  }
}
