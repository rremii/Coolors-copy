import { SettingBtn } from "@shared/ui/SettingBtn.tsx"
import { FC } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import {
  addLockedColor,
  removeLockedColor,
} from "@entities/colors/model/colorsSlice.ts"
import Lock from "@icons/lock.svg?react"
import LockOpened from "@icons/lock-open.svg?react"

interface Props {
  isHidden: boolean
  colorId: number
  // colorIndex: number
  iconColor?: string
}

export const LockColor: FC<Props> = ({ isHidden, colorId, iconColor }) => {
  const dispatch = useAppDispatch()

  const lockedColorsIds = useTypedSelector(
    (state) => state.Colors.lockedColorsIds
  )
  const isLockedColor = lockedColorsIds.includes(colorId)

  const onClick = () => {
    if (isLockedColor) dispatch(removeLockedColor({ id: colorId }))
    else dispatch(addLockedColor({ id: colorId }))
  }

  const activeLockStyles: React.CSSProperties = {
    transform: "scale(1.2)",
  }

  return (
    <SettingBtn
      styles={isLockedColor ? activeLockStyles : null}
      onClick={onClick}
      isHidden={!isLockedColor && isHidden}
    >
      {isLockedColor ? (
        <Lock fill={iconColor} />
      ) : (
        <LockOpened fill={iconColor} />
      )}
    </SettingBtn>
  )
}
