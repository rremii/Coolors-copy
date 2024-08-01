import { createColors } from "@entities/colors/model/colorsSlice"
import { getRandomColor } from "@shared/helpers/getRandomColor"
import { rgbToHex } from "@shared/helpers/rgbToHex"
import { useAppDispatch } from "@shared/hooks/storeHooks"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export const useSetColorsWithRedirect = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname.slice(1)) return

    const color1 = getRandomColor()
    const color2 = getRandomColor()

    const hex1 = rgbToHex(color1).slice(1)
    const hex2 = rgbToHex(color2).slice(1)

    navigate(`/${hex1}-${hex2}`)
    dispatch(createColors([color1, color2]))
  }, [location.pathname])
}
