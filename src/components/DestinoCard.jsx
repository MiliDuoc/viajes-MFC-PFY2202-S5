import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography
} from "@mui/material"

import { Link } from "react-router"

function DestinoCard({ destino }) {
  return (
    <Card
      elevation={3}
      sx={{
        height: "100%",
        transition: "0.2s",
        "&:hover": {
          transform: "translateY(-4px)"
        }
      }}
    >
      <CardActionArea
        component={Link}
        to={`/destino/${destino.id}`}
        sx={{ height: "100%" }}
      >
        <CardContent>
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
          >
            {destino.ciudad}
          </Typography>

          <Typography
            color="primary"
            fontWeight="bold"
          >
            {destino.pais}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ my: 2 }}
          >
            {destino.descripcion}
          </Typography>

          <Stack
            direction="row"
            gap={1}
            flexWrap="wrap"
          >
            {destino.actividades.map(
              (actividad) => (
                <Chip
                  key={actividad}
                  label={actividad}
                  size="small"
                />
              )
            )}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default DestinoCard
