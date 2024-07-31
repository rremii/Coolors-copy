import { AuthStages, setAuthStage, toggleAuth } from "@entities/auth"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { FC, ReactNode } from "react"
import { closeMenu } from "@entities/ui/model/UiSlice.ts"

interface Props {
  buttonNode: ReactNode
  authStage: AuthStages
}

export const OpenAuthBtn: FC<Props> = ({ buttonNode, authStage }) => {
  const dispatch = useAppDispatch()


  const openAuth = () => {
    dispatch(setAuthStage(authStage))
    dispatch(toggleAuth(true))
    dispatch(closeMenu("sidebar"))
  }

  return <div onClick={openAuth}>{buttonNode}</div>
}
