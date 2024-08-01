import {
  getLockedColorIndexes,
  setHasMountAnimation,
  updateColors,
} from "@entities/colors/model/colorsSlice.ts"
import { randomizeColors } from "@entities/colors/model/randomizeColors.ts"
import { useGetColorsFromUrl } from "@entities/colors/model/useGetColorsFromUrl.tsx"
import { useSetColorsToUrl } from "@entities/colors/model/useSetColorsToUrl.tsx"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"

export const useRandomizeColors = () => {
  const dispatch = useAppDispatch()

  const lockedColorsIndexes = useTypedSelector(getLockedColorIndexes)

  const colors = useGetColorsFromUrl()
  const { setColorsToUrl } = useSetColorsToUrl()

  const randomize = () => {
    const newColors = randomizeColors(colors, lockedColorsIndexes)

    setColorsToUrl(newColors)
    dispatch(setHasMountAnimation(false))
    dispatch(updateColors(newColors))
  }

  return { randomize }
}
