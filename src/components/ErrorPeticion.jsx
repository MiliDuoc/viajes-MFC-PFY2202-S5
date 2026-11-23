import {
  Alert,
  AlertTitle,
  Button
} from "@mui/material"

function ErrorPeticion({
  mensaje,
  onReintentar
}) {
  return (
    <Alert
      severity="error"
      action={
        onReintentar ? (
          <Button
            color="inherit"
            onClick={onReintentar}
          >
            Reintentar
          </Button>
        ) : null
      }
    >
      <AlertTitle>
        No fue posible cargar la información
      </AlertTitle>

      {mensaje}
    </Alert>
  )
}

export default ErrorPeticion
