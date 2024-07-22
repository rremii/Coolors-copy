import { FC, forwardRef } from "react"
import { SettingBtn } from "@shared/ui/SettingBtn.tsx"
import DragIcon from "@icons/arrows-horizontal.svg?react"

interface Props {
  isHidden?: boolean
}

export const DragColor: FC<Props> = forwardRef(({ isHidden }, ref) => {

  return <SettingBtn ref={ref} isHidden={isHidden}>
    <DragIcon stroke="white" />
  </SettingBtn>
})