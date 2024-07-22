import { withOverlay } from "@shared/hocs/with-overlay.tsx"
import { Cross } from "@shared/ui/Cross.tsx"
import { FC } from "react"
import { useAddColorToUrl } from "@features/addColorWithOverlay/model/useAddColorToUrl.tsx"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { insertColor } from "@entities/colors/model/colorsSlice.ts"
import { useGetNewColorByIndex } from "@entities/colors/model/useGetNewColorByIndex.tsx"
import { useGetColorsFromUrl } from "@entities/colors/model/useGetColorsFromUrl.tsx"
import { SettingBtn } from "@shared/ui/SettingBtn.tsx"

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
    if (allColors.length >= 6) return

    addColorToUrl()
    dispatch(insertColor({
      color: newColor,
      index
    }))
  }

  return <Cross onClick={addColor} isHidden={isHidden} />
}

export const AddColorWithOverlay = withOverlay(AddColor)
