import { ColorType } from "@entities/colors/types.ts"

export const getContrastColor = (color: ColorType): string => {

  const grayAmount = (color[0] + color[1] + color[2]) / 3

  return grayAmount < 127 ? "#fff" : "#000"

}