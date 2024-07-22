import { ColorType } from "@entities/colors/types.ts"
import { rgbToHex } from "@shared/helpers/rgbToHex.ts"

export const getStrFromColors = (colors: ColorType[]): string => {


  const hexColors = colors.map((rgbColor) => rgbToHex(rgbColor).slice(1))


  return hexColors.join("-")

}