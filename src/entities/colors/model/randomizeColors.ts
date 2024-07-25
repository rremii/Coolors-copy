import { ColorType } from "@entities/colors/types.ts"
import { getRandomColor } from "@shared/helpers/getRandomColor.ts"

export const randomizeColors = (
  colors: ColorType[],
  exceptionIndexes: number[],
) => {
  return colors.map((color, index) =>
    !exceptionIndexes.includes(index) ? getRandomColor() : color,
  )
}
