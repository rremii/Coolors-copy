import { ColorType } from "@entities/colors/types.ts"

export const mergeColors = (colors: [ColorType, ColorType]): ColorType => {
  if (!colors.length) return [0, 0, 0]

  return [
    Math.floor((colors[0][0] + colors[1][0]) / 2),
    Math.floor((colors[0][1] + colors[1][1]) / 2),
    Math.floor((colors[0][2] + colors[1][2]) / 2),
  ]
}
