import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import {
  CssBaseline,
  ThemeProvider
} from "@mui/material"

import { ApolloProvider } from "@apollo/client/react"
import { HashRouter } from "react-router"

import App from "./App.jsx"
import apolloClient from "./services/apolloClient"
import theme from "./theme/theme"

async function iniciarMock() {
  try {
    const { worker } =
      await import("./mocks/browser")

    await worker.start({
      onUnhandledRequest: "bypass",
      serviceWorker: {
        url: `${
          import.meta.env.BASE_URL
        }mockServiceWorker.js`
      }
    })

    return true
  } catch (error) {
    console.error(
      "No fue posible iniciar el backend mock:",
      error
    )

    return false
  }
}

async function iniciarAplicacion() {
  const mockActivo = await iniciarMock()

  const root =
    createRoot(
      document.getElementById("root")
    )

  if (!mockActivo) {
    root.render(
      <div
        style={{
          fontFamily: "Arial",
          padding: "40px"
        }}
      >
        <h2>
          No fue posible iniciar los servicios de viaje.
        </h2>

        <p>
          Recarga la página para volver a intentarlo.
        </p>

        <button
          onClick={() =>
            window.location.reload()
          }
        >
          Reintentar
        </button>
      </div>
    )

    return
  }

  root.render(
    <StrictMode>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <HashRouter>
            <App />
          </HashRouter>
        </ThemeProvider>
      </ApolloProvider>
    </StrictMode>
  )
}

iniciarAplicacion()
