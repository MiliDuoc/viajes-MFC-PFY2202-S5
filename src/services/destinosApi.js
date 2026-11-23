export async function obtenerDestinos({
  signal,
  simularError = false
} = {}) {
  const url = simularError
    ? `${import.meta.env.BASE_URL}api/destinos?error=500`
    : `${import.meta.env.BASE_URL}api/destinos`

  try {
    const respuesta = await fetch(
      url,
      { signal }
    )

    if (!respuesta.ok) {
      let mensaje =
        "No fue posible obtener los destinos."

      try {
        const datos =
          await respuesta.json()

        mensaje =
          datos.mensaje || mensaje
      } catch {
        // Conserva el mensaje anterior.
      }

      throw new Error(mensaje)
    }

    return await respuesta.json()
  } catch (error) {
    if (error.name === "AbortError") {
      throw error
    }

    if (
      error.message ===
      "No fue posible obtener los destinos."
    ) {
      throw error
    }

    throw new Error(
      "No fue posible conectar con el servicio de destinos."
    )
  }
}