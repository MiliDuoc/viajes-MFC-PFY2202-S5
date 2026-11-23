import {
  Box,
  Button,
  Paper,
  Typography
} from "@mui/material"

import { Link } from "react-router"

function NoEncontrado() {
  return (
    <Box
      sx={{
        minHeight: "55vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 5,
          textAlign: "center"
        }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          color="primary"
        >
          404
        </Typography>

        <Typography
          variant="h5"
          gutterBottom
        >
          Página no encontrada
        </Typography>

        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Volver al inicio
        </Button>
      </Paper>
    </Box>
  )
}

export default NoEncontrado
