import { useGetColorsFromUrl } from "@entities/colors/model/useGetColorsFromUrl.tsx"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { randomizeColors } from "@entities/colors/model/randomizeColors.ts"
import { KeyCodes, useKeyPress } from "@shared/hooks/useKeyPress.tsx"
import { useSetColorsToUrl } from "@entities/colors/model/useSetColorsToUrl.tsx"
import { getLockedColorIndexes, setHasMountAnimation, updateColors } from "@entities/colors/model/colorsSlice.ts"

export const useRandomizeColorsKeyPress = (keyCode: KeyCodes) => {
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

  useKeyPress(keyCode, randomize)
}
