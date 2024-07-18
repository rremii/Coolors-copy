import { useLocation, useNavigate } from "react-router-dom"
import { removeColorFromUrlStr } from "@shared/helpers/removeColorFromUrlStr.ts"

export const useRemoveColorFromUrl = (index: number) => {
  const navigate = useNavigate()
  const location = useLocation()

  const removeColorFromUrl = () => {

    const newUrl = removeColorFromUrlStr(index, location.pathname.slice(1))


    navigate("/" + newUrl)
  }

  return { removeColorFromUrl }
}