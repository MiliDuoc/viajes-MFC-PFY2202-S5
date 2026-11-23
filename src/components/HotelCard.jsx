import {
  Card,
  CardContent,
  Chip,
  Stack,
  Typography
} from "@mui/material"

function HotelCard({ hotel }) {
  const precio = new Intl.NumberFormat(
    "es-CL",
    {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0
    }
  ).format(hotel.precio)

  return (
    <Card elevation={2}>
      <CardContent>
        <Typography
          variant="h6"
          fontWeight="bold"
        >
          {hotel.nombre}
        </Typography>

        <Typography color="text.secondary">
          Estadía: {hotel.noches} noches
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{ mt: 2 }}
        >
          <Chip
            label={precio}
            color="secondary"
          />

          <Chip
            label={
              hotel.disponible
                ? "Disponible"
                : "Sin disponibilidad"
            }
            color={
              hotel.disponible
                ? "success"
                : "error"
            }
          />
        </Stack>
      </CardContent>
    </Card>
  )
}

export default HotelCard
