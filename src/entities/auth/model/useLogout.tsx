import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { useLoginMutation, useLogoutMutation } from "@entities/auth/api/AuthApi.ts"
import { useEffect } from "react"
import { setAuthInitial, setAuthRejected, setAuthSuccess, toggleAuth } from "@entities/auth"
import { LoginDto } from "@entities/auth/types.ts"

export const useLogout = () => {

  const dispatch = useAppDispatch()

  const [logout, { isLoading, isError, error, isSuccess }] =
    useLogoutMutation()

  useEffect(() => {
    if (!isSuccess && !isError) return

    localStorage.removeItem("accessToken")
    dispatch(setAuthInitial())
  }, [isLoading])

  const handleLogout = async () => {
    await logout()
  }

  return {
    logout: handleLogout,
    isLoading,
    isError,
    error,
    isSuccess,
  }

}