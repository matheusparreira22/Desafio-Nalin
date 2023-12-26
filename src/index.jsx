import React from "react"
import ReactDOM from "react-dom/client"
import LoginPage from "./views/form/LoginPage"
import "./index.css"
import api from "./services/api"

import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"
import Products from "./views/Products"

function checkAccessTokenHasExpired(accessToken) {
  if (!accessToken) return true

  const partsOfToken = accessToken.split(".")

  if (partsOfToken.length < 2) return true

  const tokenDecoded = JSON.parse(atob(partsOfToken[1])) // Checa o payload que é a parte 2

  return Date.now() > tokenDecoded.exp * 1000
}

function TokenFunctionProducts() {
  if (checkToken()) return <Products />

  return <Navigate to="/login" />
}
//valido
function checkToken() {
  const token = sessionStorage.getItem("token-nalin")

  if (checkAccessTokenHasExpired(token)) {
    sessionStorage.removeItem("token-nalin")
    return false
  }

  api.defaults.headers.common["Authorization"] = `Bearer ${token}`
  return true
}
const NoToken = function () {
  if (!checkToken()) return <LoginPage />

  return <Navigate to="/produtos" />
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/login"} />
  },
  {
    path: "/login",
    element: <NoToken />
  },
  {
    path: "/produtos",
    element: <TokenFunctionProducts />
  },
  {
    path: "/*",
    element: <Navigate to={"/"}/>
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
