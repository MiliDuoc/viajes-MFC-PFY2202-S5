import {
  Route,
  Routes
} from "react-router"

import DestinoDetalle from "../pages/DestinoDetalle"
import Inicio from "../pages/Inicio"
import NoEncontrado from "../pages/NoEncontrado"

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
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
