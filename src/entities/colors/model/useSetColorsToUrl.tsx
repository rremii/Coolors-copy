import { IColorCell } from "@entities/colors/model/colorsSlice.ts"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ColorType } from "@entities/colors/types.ts"
import { getStrFromColors } from "@entities/colors/model/getStrFromColors.ts"

export const useSetColorsToUrl = () => {


  const navigate = useNavigate()


  const setColorsToUrl = (colors: ColorType[]) => {

    const pathname = getStrFromColors(colors)

    navigate("/" + pathname)
  }

  return { setColorsToUrl }

}