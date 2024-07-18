import { ColorType } from "@entities/colors/types.ts"

export const colorToString = (color: ColorType): string => {
  return `rgb(${color[0]},${color[1]},${color[2]})`
}