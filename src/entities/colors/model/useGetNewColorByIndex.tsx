import { mergeColors } from "@shared/helpers/mergeColors.ts"
import { useGetColorsFromUrl } from "@entities/colors/model/useGetColorsFromUrl.tsx"

export const useGetNewColorByIndex = (index: number) => {

  const allColors = useGetColorsFromUrl()

  const neighborСolors = [allColors[index], allColors[index + 1]]

  return mergeColors(neighborСolors)

}