import { SettingCell } from "@shared/ui/SettingCell.tsx"
import Cross from "@icons/cross.svg?react"
import { useRemoveColorFromUrl } from "@features/removeColor/model/useRemoveColorFromUrl.tsx"
import { FC } from "react"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { removeColor } from "@entities/colors/model/colorsSlice.ts"
import { useGetColorsFromUrl } from "@entities/colors/model/useGetColorsFromUrl.tsx"

interface Props {
  index: number
  isHidden: boolean
}

export const RemoveColor: FC<Props> = ({ index, isHidden }) => {
  const dispatch = useAppDispatch()

  const { removeColorFromUrl } = useRemoveColorFromUrl(index)


  const colors = useGetColorsFromUrl()

  const handleRemoveColor = () => {
    if (colors.length <= 2) return

    removeColorFromUrl()
    dispatch(removeColor({ index }))
  }


  return <SettingCell onClick={handleRemoveColor} icon={<Cross />} isHidden={isHidden} />
}