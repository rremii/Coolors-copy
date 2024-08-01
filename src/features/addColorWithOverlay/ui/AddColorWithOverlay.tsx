import {
  insertNewColor,
  setHasMountAnimation,
} from "@entities/colors/model/colorsSlice.ts"
import { useGetColorsFromUrl } from "@entities/colors/model/useGetColorsFromUrl.tsx"
import { useGetNewColorByIndex } from "@entities/colors/model/useGetNewColorByIndex.tsx"
import { useAddColorToUrl } from "@features/addColorWithOverlay/model/useAddColorToUrl.tsx"
import { withOverlay } from "@shared/hocs/with-overlay.tsx"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { Cross } from "@shared/ui/Cross.tsx"
import { FC } from "react"

interface Props {
  isHidden: boolean
  index: number
}

const AddColor: FC<Props> = ({ isHidden, index }) => {
  const dispatch = useAppDispatch()

  const { addColorToUrl } = useAddColorToUrl(index)
  const newColor = useGetNewColorByIndex(index)

  const allColors = useGetColorsFromUrl()

  const addColor = () => {
    if (allColors.length >= 6 || !newColor) return

    dispatch(setHasMountAnimation(true))
    addColorToUrl()
    dispatch(
      insertNewColor({
        color: newColor,
        index,
      })
    )

    const timer = setTimeout(() => {
      dispatch(setHasMountAnimation(false))

      clearTimeout(timer)
    }, 1000)
  }

  return <Cross onClick={addColor} isHidden={isHidden} />
}

export const AddColorWithOverlay = withOverlay(AddColor)
