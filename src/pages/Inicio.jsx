import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography
} from "@mui/material"

import { useCallback } from "react"

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
        variant="overline"
        sx={{
          color: "#00796b",
          fontWeight: 800
        }}
      >
        EXPLORA CHILE
      </Typography>

      <Typography
        variant="h3"
        fontWeight={800}
        gutterBottom
      >
        Destinos disponibles
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 2 }}
      >
        Explora destinos únicos en Chile y encuentra vuelos y hoteles
        para planificar tu próxima aventura.
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 3
        }}
      >
        <FormControlLabel
          control={<Checkbox size="small" />}
          label="Simular error del servidor"
        />

        <Button
          variant="outlined"
          color="primary"
          onClick={reintentar}
        >
          Actualizar destinos
        </Button>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, 1fr)"
          },
          gap: 2
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