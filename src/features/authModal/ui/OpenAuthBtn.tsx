import { AuthStages, setAuthStage, toggleAuth } from "@entities/auth"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { FC, ReactNode } from "react"

interface Props {
  buttonNode: ReactNode
  authStage: AuthStages
}

export const OpenAuthBtn: FC<Props> = ({ buttonNode, authStage }) => {
  const dispatch = useAppDispatch()

  const openAuth = () => {
    dispatch(setAuthStage(authStage))
    dispatch(toggleAuth(true))
  }

  return <div onClick={openAuth}>{buttonNode}</div>
}
