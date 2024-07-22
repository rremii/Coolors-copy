import Cross from "@icons/cross.svg?react"
import { useRemoveColorFromUrl } from "@features/removeColor/model/useRemoveColorFromUrl.tsx"
import { FC } from "react"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { removeColor } from "@entities/colors/model/colorsSlice.ts"
import { useGetColorsFromUrl } from "@entities/colors/model/useGetColorsFromUrl.tsx"
import { WithDelayDeleting } from "@entities/colors/model/with-deleting.tsx"
import { SettingBtn } from "@shared/ui/SettingBtn.tsx"

interface Props extends WithDelayDeleting {
  index: number
  isHidden: boolean
  iconColor?: string
}


export const RemoveColor: FC<Props> = ({ index, isHidden, delayDeleteCb, iconColor }) => {
  const dispatch = useAppDispatch()

  const { removeColorFromUrl } = useRemoveColorFromUrl(index)

  const colors = useGetColorsFromUrl()

  const handleRemoveColor = () => {
    if (colors.length <= 2) return

    removeColorFromUrl()
    dispatch(removeColor({ index }))
  }


  return <SettingBtn onClick={delayDeleteCb<void, void>(handleRemoveColor)} isHidden={isHidden}>
    <Cross fill={iconColor} />
  </SettingBtn>
}

