import { ColorType } from "@entities/colors/types.ts"
import { useToast } from "@entities/toast/model/useToast"
import Copy from "@icons/copy.svg?react"
import { rgbToHex } from "@shared/helpers/rgbToHex.ts"
import { SettingBtn } from "@shared/ui/SettingBtn.tsx"
import { FC } from "react"

interface Props {
  isHidden?: boolean
  iconColor?: string
  color: ColorType
}

export const CopyColor: FC<Props> = ({ isHidden, iconColor, color }) => {
  const { addToast } = useToast()

  const copyColor = () => {
    navigator.clipboard
      .writeText(rgbToHex(color))
      .then(() =>
        addToast({
          type: "info",
          content: `Color ${rgbToHex(color)} is copied`,
        })
      )
      .catch((err) =>
        addToast({ type: "info", content: "Couldn't copy the color" })
      )
  }

  return (
    <SettingBtn onClick={copyColor} isHidden={isHidden}>
      <Copy fill={iconColor} />
    </SettingBtn>
  )
}
