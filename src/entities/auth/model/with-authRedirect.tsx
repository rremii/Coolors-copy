import { FC, Suspense, useEffect } from "react"
import { BrowserRouter, useNavigate } from "react-router-dom"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"

export const withAuthRedirect = (Component: FC) => () => {
  const navigate = useNavigate()

  const isLoggedIn = useTypedSelector(state => state.Auth.isLoggedIn)


  useEffect(() => {
    if (isLoggedIn === "rejected")
      navigate("/")

  }, [isLoggedIn])

  return <Component />
}


