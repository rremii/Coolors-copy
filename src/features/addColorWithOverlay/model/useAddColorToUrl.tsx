import { useLocation, useNavigate } from "react-router-dom"
import { addNewColorToUrlStr } from "@shared/helpers/addNewColorToUrlStr.ts"
import { rgbToHex } from "@shared/helpers/rgbToHex.ts"
import { useGetNewColorByIndex } from "@entities/colors/model/useGetNewColorByIndex.tsx"

export const useAddColorToUrl = (index: number) => {
  const navigate = useNavigate()
  const location = useLocation()

  const newColor = useGetNewColorByIndex(index)

  const addColorToUrl = () => {
    const newUrl = addNewColorToUrlStr(
      index,
      rgbToHex(newColor),
      location.pathname.slice(1),
    )

    navigate("/" + newUrl)
  }

  return { addColorToUrl }
}
