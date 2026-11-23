import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: "#00695c",
      dark: "#004d40"
    },
    secondary: {
      main: "#ef6c00"
    },
    background: {
      default: "#f5f7f8"
    }
  },

  shape: {
    borderRadius: 14
  },

  typography: {
    fontFamily:
      '"Segoe UI", Arial, sans-serif'
  }
})

export default theme