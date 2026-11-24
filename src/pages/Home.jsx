import {
  Box,
  Button,
  Paper,
  Typography
} from "@mui/material"

import { Link } from "react-router"

function Home() {
  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          p: {
            xs: 4,
            md: 7
          },
          borderRadius: 4,
          background:
            "linear-gradient(135deg, #00695c 0%, #00897b 65%, #ef6c00 140%)",
          color: "white",
          mb: 4
        }}
      >
        <Typography
          variant="overline"
          sx={{ opacity: 0.9 }}
        >
          AGENCIA DE VIAJES
        </Typography>

        <Typography
          variant="h2"
          fontWeight={800}
          sx={{
            fontSize: {
              xs: "2.4rem",
              md: "4rem"
            }
          }}
        >
          Viajes MFC
        </Typography>

        <Typography
          variant="h5"
          sx={{
            mt: 2,
            mb: 3,
            maxWidth: 700,
            opacity: 0.95
          }}
        >
          Descubre destinos únicos en Chile y encuentra vuelos,
          hoteles y experiencias para planificar tu próxima aventura.
        </Typography>

        <Button
          component={Link}
          to="/destinos"
          variant="contained"
          color="secondary"
          size="large"
        >
          Ver destinos
        </Button>
      </Paper>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(3, 1fr)"
          },
          gap: 2
        }}
      >
        {[
          ["Destinos", "Explora lugares destacados de Chile."],
          ["Vuelos", "Consulta vuelos disponibles mediante GraphQL."],
          ["Hoteles", "Revisa alojamientos, precios y disponibilidad."]
        ].map(([titulo, texto]) => (
          <Paper
            key={titulo}
            variant="outlined"
            sx={{
              p: 3,
              borderRadius: 3
            }}
          >
            <Typography
              variant="h6"
              fontWeight={800}
              gutterBottom
            >
              {titulo}
            </Typography>

            <Typography color="text.secondary">
              {texto}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  )
}

export default Home