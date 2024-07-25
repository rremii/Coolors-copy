import { useLocation } from "react-router-dom"
import { hexToRgb } from "@shared/helpers/HexToRgb.ts"
import { ColorType } from "@entities/colors/types.ts"

export const useGetColorsFromUrl = (): ColorType[] => {
  const location = useLocation()

  const pathname = location.pathname.slice(1)

  if (!pathname) return []

  const colorsHex = pathname.split("-").map((colorValue) => "#" + colorValue)

  return colorsHex
    .map((colorHex) => hexToRgb(colorHex))
    .filter((color) => !!color)
}
