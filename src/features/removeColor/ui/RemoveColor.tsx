import Cross from "@icons/cross.svg?react"
import { useRemoveColorFromUrl } from "@features/removeColor/model/useRemoveColorFromUrl.tsx"
import { FC } from "react"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { removeColor, removeLockedColor } from "@entities/colors/model/colorsSlice.ts"
import { useGetColorsFromUrl } from "@entities/colors/model/useGetColorsFromUrl.tsx"
import { WithDelayDeleting } from "@entities/colors/model/with-deleting.tsx"
import { SettingBtn } from "@shared/ui/SettingBtn.tsx"

interface Props extends WithDelayDeleting {
  colorIndex: number
  isHidden: boolean
  iconColor?: string
  colorId: number
}

export const RemoveColor: FC<Props> = ({
                                         colorIndex,
                                         isHidden,
                                         delayDeleteCb,
                                         iconColor,
                                         colorId,
                                       }) => {
  const dispatch = useAppDispatch()

  const { removeColorFromUrl } = useRemoveColorFromUrl(colorIndex)

  const colors = useGetColorsFromUrl()

  const handleRemoveColor = () => {
    if (colors.length <= 2) return

    removeColorFromUrl()

    dispatch(removeColor({ index: colorIndex }))
    dispatch(removeLockedColor({ id: colorId }))
  }

  return (
    <SettingBtn
      onClick={delayDeleteCb<void, void>(handleRemoveColor)}
      isHidden={isHidden}
    >
      <Cross fill={iconColor} />
    </SettingBtn>
  )
}
