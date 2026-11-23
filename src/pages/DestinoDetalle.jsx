import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react"

import {
  Alert,
  Box,
  Button,
  Divider,
  Typography
} from "@mui/material"

import {
  Link,
  useParams
} from "react-router"

import EstadoCarga from "../components/EstadoCarga"
import ErrorPeticion from "../components/ErrorPeticion"
import HotelCard from "../components/HotelCard"
import VueloCard from "../components/VueloCard"

const GET_OPCIONES = gql`
  query GetOpcionesViaje($destino: String!) {
    opcionesViaje(destino: $destino) {
      vuelos {
        id
        aerolinea
        origen
        destino
        fecha
        precio
        disponible
      }
      hoteles {
        id
        nombre
        noches
        precio
        disponible
      }
    }
  }
`

function DestinoDetalle() {
  const { id } = useParams()

  const {
    loading,
    error,
    data,
    refetch
  } = useQuery(GET_OPCIONES, {
    variables: {
      destino: id
    },
    fetchPolicy: "cache-and-network"
  })

  if (loading && !data) {
    return (
      <EstadoCarga mensaje="Consultando vuelos y hoteles mediante GraphQL..." />
    )
  }

  if (error) {
    return (
      <Box>
        <ErrorPeticion
          mensaje={
            error.message ||
            "No fue posible consultar las opciones de viaje."
          }
          onReintentar={() => refetch()}
        />

        <Button
          component={Link}
          to="/"
          sx={{ mt: 2 }}
        >
          Volver a destinos
        </Button>
      </Box>
    )
  }

  const vuelos =
    data?.opcionesViaje?.vuelos ?? []

  const hoteles =
    data?.opcionesViaje?.hoteles ?? []

  const titulo = id
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letra) =>
      letra.toUpperCase()
    )

  return (
    <Box>
      <Button
        component={Link}
        to="/"
        sx={{ mb: 2 }}
      >
        ← Volver a destinos
      </Button>

      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
      >
        {titulo}
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Opciones obtenidas mediante GraphQL.
      </Typography>

      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ mb: 2 }}
      >
        Vuelos disponibles
      </Typography>

      {vuelos.length === 0 ? (
        <Alert severity="info">
          No hay vuelos disponibles para este destino.
        </Alert>
      ) : (
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
          {vuelos.map((vuelo) => (
            <VueloCard
              key={vuelo.id}
              vuelo={vuelo}
            />
          ))}
        </Box>
      )}

      <Divider sx={{ my: 4 }} />

      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ mb: 2 }}
      >
        Hoteles disponibles
      </Typography>

      {hoteles.length === 0 ? (
        <Alert severity="info">
          No hay hoteles disponibles para este destino.
        </Alert>
      ) : (
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
          {hoteles.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}

export default DestinoDetalle
