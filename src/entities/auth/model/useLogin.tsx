import { useAppDispatch } from "@shared/hooks/storeHooks"
import { useEffect } from "react"
import { useLoginMutation } from "../api/AuthApi"
import { LoginDto } from "../types"
import { setAuthRejected, setAuthSuccess, toggleAuth } from "./AuthSlice"

export const useLogin = () => {
  const dispatch = useAppDispatch()

  const [login, { isLoading, isError, error, data: result, isSuccess }] =
    useLoginMutation()

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("accessToken", result.accessToken)

      dispatch(setAuthSuccess())
      dispatch(toggleAuth(false))
    }
    if (isError) {
      localStorage.removeItem("accessToken")
      dispatch(setAuthRejected())
    }
  }, [isLoading])

  const handleLogin = async (authData: LoginDto) => {
    await login(authData)
  }

  return {
    login: handleLogin,
    isLoading,
    isError,
    error,
  }
}
