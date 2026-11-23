import {
  Button,
  Card,
  CardContent,
  Divider,
  Typography
} from "@mui/material"

import { Link } from "react-router"

function DestinoCard({ destino }) {
  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white"
      }}
    >
      <CardContent
        sx={{
          p: 3,
          flexGrow: 1
        }}
      >
        <Typography
          variant="overline"
          sx={{
            color: "#00796b",
            fontWeight: 800
          }}
        >
          CHILE
        </Typography>

        <Typography
          variant="h5"
          fontWeight={800}
        >
          {destino.ciudad}
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          {destino.pais}
        </Typography>

        <Typography
          variant="body2"
          sx={{ mb: 2 }}
        >
          {destino.descripcion}
        </Typography>

        <Typography
          fontWeight={700}
          variant="body2"
          sx={{ mb: 1 }}
        >
          Actividades populares
        </Typography>

        <BoxLista actividades={destino.actividades} />

        <Divider sx={{ my: 2 }} />

        <Button
          component={Link}
          to={`/destino/${destino.id}`}
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#00695c",
            "&:hover": {
              backgroundColor: "#004d40"
            }
          }}
        >
          Ver vuelos y hoteles
        </Button>
      </CardContent>
    </Card>
  )
}

function BoxLista({ actividades }) {
  return (
    <ul
      style={{
        margin: 0,
        paddingLeft: "20px"
      }}
    >
      {actividades.map((actividad) => (
        <li key={actividad}>
          <Typography variant="body2">
            {actividad}
          </Typography>
        </li>
      ))}
    </ul>
  )
}

export default DestinoCard