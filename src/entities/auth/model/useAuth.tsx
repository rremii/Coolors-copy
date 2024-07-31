import { useRefreshQuery } from "@entities/auth/api/AuthApi.ts"
import {
  setAuthRejected,
  setAuthSuccess,
} from "@entities/auth/model/AuthSlice.ts"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export const useAuth = () => {
  const dispatch = useAppDispatch()

  const { data, isError } = useRefreshQuery()

  useEffect(() => {
    if (!localStorage.getItem("accessToken") || isError)
      dispatch(setAuthRejected())

    if (data) {
      localStorage.setItem("accessToken", data.accessToken)
      dispatch(setAuthSuccess())
    }
  }, [data, isError])
}
