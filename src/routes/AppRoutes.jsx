import {
  Route,
  Routes
} from "react-router"

import Home from "../pages/Home"
import Inicio from "../pages/Inicio"
import DestinoDetalle from "../pages/DestinoDetalle"
import NoEncontrado from "../pages/NoEncontrado"

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/destinos"
        element={<Inicio />}
      />

      <Route
        path="/destino/:id"
        element={<DestinoDetalle />}
      />

      <Route
        path="*"
        element={<NoEncontrado />}
      />
    </Routes>
  )
}

export default AppRoutes