import { mergeColors } from "@shared/helpers/mergeColors.ts"
import { useGetColorsFromUrl } from "@entities/colors/model/useGetColorsFromUrl.tsx"
import { ColorType } from "@entities/colors/types.ts"

export const useGetNewColorByIndex = (index: number): ColorType | null => {
  const allColors = useGetColorsFromUrl()
  if (!allColors.length) return null

  return mergeColors([allColors[index], allColors[index + 1]])
}
