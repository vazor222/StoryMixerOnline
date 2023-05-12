import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Home, Lobby, Info } from "../pages";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route
      path="/"
      element={<Home />}
    />
    <Route
      path="/info"
      element={<Info />}
    />
    <Route
      path="/lobby"
      element={<Lobby />}
    />
    </>
  )
)