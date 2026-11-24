import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography
} from "@mui/material"

import { Link } from "react-router"
import AppRoutes from "./routes/AppRoutes"

function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f7f8"
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "#00695c",
          color: "white"
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              justifyContent: "space-between"
            }}
          >
            <Typography
              component={Link}
              to="/"
              variant="h6"
              sx={{
                color: "white",
                textDecoration: "none",
                fontWeight: 800
              }}
            >
              Viajes MFC
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 1
              }}
            >
              <Button
  component={Link}
  to="/"
>
  Inicio
</Button>

<Button
  component={Link}
  to="/destinos"
  variant="outlined"
  sx={{
    color: "white",
    borderColor: "rgba(255,255,255,0.7)"
  }}
>
  Destinos
</Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container
        maxWidth="lg"
        sx={{
          py: {
            xs: 3,
            md: 5
          }
        }}
      >
        <AppRoutes />
      </Container>
    </Box>
  )
}

export default App