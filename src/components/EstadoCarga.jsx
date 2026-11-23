import {
  Box,
  CircularProgress,
  Typography
} from "@mui/material"

function EstadoCarga({
  mensaje = "Cargando información..."
}) {
  return (
    <Box
      sx={{
        minHeight: 220,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2
      }}
    >
      <CircularProgress />

      <Typography color="text.secondary">
        {mensaje}
      </Typography>
    </Box>
  )
}

export default EstadoCarga
