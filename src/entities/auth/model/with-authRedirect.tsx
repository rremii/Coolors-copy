import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { FC, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const withAuthRedirect = (Component: FC) => () => {
  const navigate = useNavigate()

  const isLoggedIn = useTypedSelector((state) => state.Auth.isLoggedIn)

  useEffect(() => {
    if (isLoggedIn === "rejected") navigate("/")
  }, [isLoggedIn])

  return <Component />
}
