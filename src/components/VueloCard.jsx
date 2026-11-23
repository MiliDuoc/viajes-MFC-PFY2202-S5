import {
  Card,
  CardContent,
  Chip,
  Stack,
  Typography
} from "@mui/material"

function VueloCard({ vuelo }) {
  const precio = new Intl.NumberFormat(
    "es-CL",
    {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0
    }
  ).format(vuelo.precio)

  return (
    <Card elevation={2}>
      <CardContent>
        <Typography
          variant="h6"
          fontWeight="bold"
        >
          {vuelo.aerolinea}
        </Typography>

        <Typography>
          {vuelo.origen} → {vuelo.destino}
        </Typography>

        <Typography color="text.secondary">
          Fecha: {vuelo.fecha}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{ mt: 2 }}
        >
          <Chip
            label={precio}
            color="primary"
          />

          <Chip
            label={
              vuelo.disponible
                ? "Disponible"
                : "Sin disponibilidad"
            }
            color={
              vuelo.disponible
                ? "success"
                : "error"
            }
          />
        </Stack>
      </CardContent>
    </Card>
  )
}

export default VueloCard
