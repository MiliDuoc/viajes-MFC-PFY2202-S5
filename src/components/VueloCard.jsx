import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
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
            {vuelo.aerolinea}
          </Typography>

          <Chip
            label={
              vuelo.disponible
                ? "Disponible"
                : "Sin disponibilidad"
            }
            color={
              vuelo.disponible
                ? "success"
                : "warning"
            }
            size="small"
          />
        </Box>

        <Typography sx={{ mt: 2 }}>
          {vuelo.origen} → {vuelo.destino}
        </Typography>

        <Typography color="text.secondary">
          Salida: {vuelo.fecha}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography
          variant="caption"
          color="text.secondary"
        >
          Precio referencial del vuelo
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

export default VueloCard