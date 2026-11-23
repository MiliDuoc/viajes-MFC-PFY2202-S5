import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
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
    <Card variant="outlined">
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2
          }}
        >
          <Typography
            variant="h6"
            fontWeight={800}
          >
            {hotel.nombre}
          </Typography>

          <Chip
            label={
              hotel.disponible
                ? "Disponible"
                : "Sin disponibilidad"
            }
            color={
              hotel.disponible
                ? "success"
                : "warning"
            }
            size="small"
          />
        </Box>

        <Typography sx={{ mt: 2 }}>
          Estadía: {hotel.noches} noches
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography
          variant="caption"
          color="text.secondary"
        >
          Precio referencial por estadía
        </Typography>

        <Typography
          variant="h5"
          color="#00695c"
          fontWeight={800}
        >
          {precio}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default HotelCard