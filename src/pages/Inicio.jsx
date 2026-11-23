import {
  Box,
  Typography
} from "@mui/material"

import {
  useCallback
} from "react"

import DestinoCard from "../components/DestinoCard"
import EstadoCarga from "../components/EstadoCarga"
import ErrorPeticion from "../components/ErrorPeticion"
import usePeticion from "../hooks/usePeticion"
import { obtenerDestinos } from "../services/destinosApi"

function Inicio() {
  const cargar = useCallback(
    (signal) => obtenerDestinos(signal),
    []
  )

  const {
    datos,
    cargando,
    error,
    reintentar
  } = usePeticion(cargar)

  if (cargando) {
    return (
      <EstadoCarga mensaje="Consultando destinos mediante REST..." />
    )
  }

  if (error) {
    return (
      <ErrorPeticion
        mensaje={error}
        onReintentar={reintentar}
      />
    )
  }

  return (
    <Box>
      <Typography
        variant="h3"
        fontWeight="bold"
        gutterBottom
      >
        Viajes MFC
      </Typography>

      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Explora destinos en Chile y revisa
        vuelos y hoteles disponibles.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, 1fr)"
          },
          gap: 3
        }}
      >
        {datos?.map((destino) => (
          <DestinoCard
            key={destino.id}
            destino={destino}
          />
        ))}
      </Box>
    </Box>
  )
}

export default Inicio
