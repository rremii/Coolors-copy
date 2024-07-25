import { SettingBtn } from "@shared/ui/SettingBtn.tsx"
import { FC } from "react"
import { ColorType } from "@entities/colors/types.ts"
import { rgbToHex } from "@shared/helpers/rgbToHex.ts"
import Copy from "@icons/copy.svg?react"

interface Props {
  isHidden?: boolean
  iconColor?: string
  color: ColorType
}

export const CopyColor: FC<Props> = ({ isHidden, iconColor, color }) => {
  const copyColor = () => {
    if (color) navigator.clipboard.writeText(rgbToHex(color))
  }

  return (
    <SettingBtn onClick={copyColor} isHidden={isHidden}>
      <Copy fill={iconColor} />
    </SettingBtn>
  )
}
