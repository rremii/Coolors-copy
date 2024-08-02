import { useAppDispatch } from "@shared/hooks/storeHooks"
import { useEffect } from "react"
import { useRegisterMutation } from "../api/AuthApi"
import { RegisterDto } from "../types"
import { setAuthRejected, setAuthSuccess, toggleAuth } from "./AuthSlice"

export const useRegister = () => {
  const dispatch = useAppDispatch()

  const [register, { isLoading, isError, error, data: result, isSuccess }] =
    useRegisterMutation()

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

  const handleRegister = async (authData: RegisterDto) => {
    await register(authData)
  }

  return {
    register: handleRegister,
    isLoading,
    isError,
    error,
    isSuccess,
  }
}
