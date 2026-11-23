import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography
} from "@mui/material"

import {
  useEffect,
  useState
} from "react"

import DestinoCard
  from "../components/DestinoCard"

import EstadoCarga
  from "../components/EstadoCarga"

import {
  obtenerDestinos
} from "../services/destinosApi"

function Inicio() {
  const [destinos, setDestinos] =
    useState([])

  const [cargando, setCargando] =
    useState(true)

  const [error, setError] =
    useState("")

  const [
    simularError,
    setSimularError
  ] = useState(false)

  const cargarDestinos =
    async (
      usarError = simularError
    ) => {
      setCargando(true)
      setError("")

      try {
        const datos =
          await obtenerDestinos({
            simularError: usarError
          })

        setDestinos(datos)
      } catch (errorPeticion) {
        setError(
          errorPeticion.message
        )
      } finally {
        setCargando(false)
      }
    }

  useEffect(() => {
    cargarDestinos(false)
  }, [])

  const reintentar = async () => {
    setSimularError(false)
    await cargarDestinos(false)
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
        Explora destinos únicos en Chile y encuentra
        vuelos y hoteles para planificar tu próxima aventura.
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 3
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={simularError}
              onChange={(evento) =>
                setSimularError(
                  evento.target.checked
                )
              }
              size="small"
            />
          }
          label="Simular error del servidor"
        />

        <Button
          variant="outlined"
          onClick={() =>
            cargarDestinos(
              simularError
            )
          }
        >
          Actualizar destinos
        </Button>
      </Box>

      {cargando && (
        <EstadoCarga
          mensaje="Consultando destinos mediante REST..."
        />
      )}

      {!cargando && error && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            py: 1
          }}
        >
          <AlertTitle
            sx={{
              fontWeight: 800
            }}
          >
            No pudimos cargar los destinos
          </AlertTitle>

          <Typography
            variant="body2"
            sx={{ mb: 2 }}
          >
            {error}
          </Typography>

          <Button
            variant="contained"
            color="error"
            onClick={reintentar}
          >
            Reintentar
          </Button>
        </Alert>
      )}

      {!cargando && !error && (
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
          {destinos.map(
            (destino) => (
              <DestinoCard
                key={destino.id}
                destino={destino}
              />
            )
          )}
        </Box>
      )}
    </Box>
  )
}

export default Inicio