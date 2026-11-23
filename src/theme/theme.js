import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: "#00695c"
    },
    secondary: {
      main: "#ef6c00"
    },
    background: {
      default: "#f5f7f8"
    }
  },

  shape: {
    borderRadius: 12
  }
})

export default theme
