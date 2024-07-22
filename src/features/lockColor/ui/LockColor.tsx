import { SettingBtn } from "@shared/ui/SettingBtn.tsx"
import { FC, useEffect, useRef } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import {
  addLockedIndex,
  getIsIndexLocked,
  removeLockedIndex
} from "@entities/colors/model/colorsSlice.ts"
import Lock from "@icons/lock.svg?react"
import LockOpened from "@icons/lock-open.svg?react"


interface Props {
  isHidden: boolean
  colorIndex: number
  iconColor?: string
}

export const LockColor: FC<Props> = ({ isHidden, colorIndex, iconColor }) => {
  const dispatch = useAppDispatch()

  const isLockedColor = useTypedSelector((state) => getIsIndexLocked(state, colorIndex))


  const onClick = () => {
    if (isLockedColor)
      dispatch(removeLockedIndex(colorIndex))
    else
      dispatch(addLockedIndex(colorIndex))
  }

  const activeLockStyles: React.CSSProperties = {
    transform: "scale(1.2)"
  }

  return <SettingBtn styles={isLockedColor ? activeLockStyles : null}
                     onClick={onClick}
                     isHidden={!isLockedColor && isHidden}>
    {isLockedColor ? <Lock fill={iconColor} /> : <LockOpened fill={iconColor} />}
  </SettingBtn>
}