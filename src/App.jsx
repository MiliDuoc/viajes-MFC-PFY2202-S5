import {
  AppBar,
  Box,
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
        backgroundColor: "background.default"
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            sx={{
              color: "white",
              textDecoration: "none",
              fontWeight: "bold"
            }}
          >
            Viajes MFC
          </Typography>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="lg"
        sx={{ py: 4 }}
      >
        <AppRoutes />
      </Container>
    </Box>
  )
}

export default App
