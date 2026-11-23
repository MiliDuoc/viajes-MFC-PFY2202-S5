import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react"

import {
  Alert,
  Box,
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  Paper,
  Tab,
  Tabs,
  Typography
} from "@mui/material"

import {
  Link,
  useParams
} from "react-router"

import { useState } from "react"

import EstadoCarga
  from "../components/EstadoCarga"

import ErrorPeticion
  from "../components/ErrorPeticion"

import HotelCard
  from "../components/HotelCard"

import VueloCard
  from "../components/VueloCard"

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

const datosDestino = {
  "san-pedro": {
    nombre: "San Pedro de Atacama",
    region: "Antofagasta · Chile",
    descripcion:
      "Desierto, paisajes altiplánicos y cielos privilegiados.",
    actividades: [
      "Valle de la Luna",
      "Géiseres del Tatio",
      "Lagunas Altiplánicas"
    ]
  },

  "puerto-varas": {
    nombre: "Puerto Varas",
    region: "Los Lagos · Chile",
    descripcion:
      "Naturaleza, volcanes y lagos del sur de Chile.",
    actividades: [
      "Lago Llanquihue",
      "Volcán Osorno",
      "Saltos del Petrohué"
    ]
  },

  "torres-del-paine": {
    nombre: "Torres del Paine",
    region: "Magallanes · Chile",
    descripcion:
      "Uno de los destinos naturales más reconocidos de la Patagonia.",
    actividades: [
      "Trekking",
      "Miradores",
      "Glaciares"
    ]
  },

  valparaiso: {
    nombre: "Valparaíso",
    region: "Valparaíso · Chile",
    descripcion:
      "Patrimonio, cerros, arte urbano y costa del Pacífico.",
    actividades: [
      "Cerro Alegre",
      "Ascensores",
      "Paseo Yugoslavo"
    ]
  }
}

function DestinoDetalle() {
  const { id } = useParams()

  const [tab, setTab] =
    useState(0)

  const [
    simularError,
    setSimularError
  ] = useState(false)

  const [
    errorSimulado,
    setErrorSimulado
  ] = useState("")

  const destino =
    datosDestino[id]

  const {
    loading,
    error,
    data,
    refetch
  } = useQuery(
    GET_OPCIONES,
    {
      variables: {
        destino: id
      },
      fetchPolicy:
        "cache-and-network"
    }
  )

  const actualizarOpciones =
    async () => {
      setErrorSimulado("")

      if (simularError) {
        try {
          const respuesta =
            await fetch(
              `${import.meta.env.BASE_URL}graphql`,
              {
                method: "POST",
                headers: {
                  "Content-Type":
                    "application/json",

                  "X-Simular-Error":
                    "true"
                },

                body:
                  JSON.stringify({
                    query: `
                      query GetOpcionesViaje(
                        $destino: String!
                      ) {
                        opcionesViaje(
                          destino: $destino
                        ) {
                          vuelos {
                            id
                          }

                          hoteles {
                            id
                          }
                        }
                      }
                    `,

                    variables: {
                      destino: id
                    }
                  })
              }
            )

          const resultado =
            await respuesta.json()

          if (
            resultado.errors &&
            resultado.errors.length > 0
          ) {
            setErrorSimulado(
              resultado.errors[0].message
            )
          }
        } catch {
          setErrorSimulado(
            "No fue posible conectar con el servicio GraphQL."
          )
        }

        return
      }

      try {
        await refetch()
      } catch {
        // Apollo muestra el error
        // mediante la variable "error".
      }
    }

  const reintentarSimulado =
    () => {
      setSimularError(false)
      setErrorSimulado("")
      refetch()
    }

  if (loading && !data) {
    return (
      <EstadoCarga
        mensaje=
          "Consultando opciones de viaje mediante GraphQL..."
      />
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
          onReintentar={
            () => refetch()
          }
        />

        <Button
          component={Link}
          to="/"
          sx={{
            mt: 2,
            color: "#00695c"
          }}
        >
          Volver a destinos
        </Button>
      </Box>
    )
  }

  const vuelos =
    data?.opcionesViaje?.vuelos
    ?? []

  const hoteles =
    data?.opcionesViaje?.hoteles
    ?? []

  return (
    <Box>
      <Button
        component={Link}
        to="/"
        sx={{
          mb: 3,
          px: 0,
          color: "#00695c"
        }}
      >
        ← Volver a destinos
      </Button>

      <Paper
        elevation={0}
        sx={{
          p: {
            xs: 3,
            md: 4
          },

          mb: 4,

          borderRadius: 3,

          background:
            "linear-gradient(135deg, #e0f2f1 0%, #ffffff 100%)",

          border:
            "1px solid #d7e5e3"
        }}
      >
        <Typography
          variant="overline"
          sx={{
            color: "#00796b",
            fontWeight: 800,
            letterSpacing: 1
          }}
        >
          {destino?.region}
        </Typography>

        <Typography
          variant="h3"
          fontWeight={800}
          gutterBottom
        >
          {destino?.nombre}
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            mb: 3,
            maxWidth: 700
          }}
        >
          {destino?.descripcion}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1
          }}
        >
          {destino?.actividades.map(
            (actividad) => (
              <Chip
                key={actividad}
                label={actividad}
                variant="outlined"
                sx={{
                  borderColor:
                    "#80cbc4",

                  color:
                    "#004d40"
                }}
              />
            )
          )}
        </Box>
      </Paper>

      <Box
        sx={{
          display: "flex",

          justifyContent:
            "space-between",

          alignItems: {
            xs: "flex-start",
            md: "center"
          },

          flexDirection: {
            xs: "column",
            md: "row"
          },

          gap: 2,
          mb: 2
        }}
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight={800}
          >
            Opciones para tu viaje
          </Typography>

          <Typography
            color="text.secondary"
          >
            Vuelos y alojamientos consultados mediante GraphQL.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap"
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={
                  simularError
                }

                onChange={(evento) =>
                  setSimularError(
                    evento.target.checked
                  )
                }

                size="small"
              />
            }
            label=
              "Simular error GraphQL"
          />

          <Button
            variant="outlined"
            onClick={
              actualizarOpciones
            }
          >
            Actualizar opciones
          </Button>
        </Box>
      </Box>

      {errorSimulado && (
        <Box sx={{ mb: 3 }}>
          <ErrorPeticion
            mensaje={
              errorSimulado
            }
            onReintentar={
              reintentarSimulado
            }
          />
        </Box>
      )}

      <Paper
        variant="outlined"
        sx={{
          borderRadius: 3,
          overflow: "hidden"
        }}
      >
        <Tabs
          value={tab}

          onChange={(
            _,
            nuevoValor
          ) =>
            setTab(
              nuevoValor
            )
          }

          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab
            label={
              `Vuelos (${vuelos.length})`
            }
          />

          <Tab
            label={
              `Hoteles (${hoteles.length})`
            }
          />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {tab === 0 && (
            <>
              {vuelos.length === 0
                ? (
                  <Alert
                    severity="info"
                  >
                    No hay vuelos disponibles para este destino.
                  </Alert>
                )
                : (
                  <Box
                    sx={{
                      display:
                        "grid",

                      gridTemplateColumns:
                        {
                          xs:
                            "1fr",

                          md:
                            "repeat(2, 1fr)"
                        },

                      gap: 2
                    }}
                  >
                    {vuelos.map(
                      (vuelo) => (
                        <VueloCard
                          key={
                            vuelo.id
                          }

                          vuelo={
                            vuelo
                          }
                        />
                      )
                    )}
                  </Box>
                )}
            </>
          )}

          {tab === 1 && (
            <>
              {hoteles.length === 0
                ? (
                  <Alert
                    severity="info"
                  >
                    No hay hoteles disponibles para este destino.
                  </Alert>
                )
                : (
                  <Box
                    sx={{
                      display:
                        "grid",

                      gridTemplateColumns:
                        {
                          xs:
                            "1fr",

                          md:
                            "repeat(2, 1fr)"
                        },

                      gap: 2
                    }}
                  >
                    {hoteles.map(
                      (hotel) => (
                        <HotelCard
                          key={
                            hotel.id
                          }

                          hotel={
                            hotel
                          }
                        />
                      )
                    )}
                  </Box>
                )}
            </>
          )}
        </Box>
      </Paper>
    </Box>
  )
}

export default DestinoDetalle