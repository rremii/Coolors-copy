import { FC, forwardRef } from "react"
import { SettingBtn } from "@shared/ui/SettingBtn.tsx"
import DragIcon from "@icons/arrows-horizontal.svg?react"

interface Props {
  isHidden?: boolean
  iconColor?: string
}

export const DragColor: FC<Props> = forwardRef(({ isHidden, iconColor }, ref) => {

  return <SettingBtn ref={ref} isHidden={isHidden}>
    <DragIcon stroke={iconColor} />
  </SettingBtn>
})