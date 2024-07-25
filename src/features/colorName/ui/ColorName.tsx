import styled from "styled-components"
import { ColorType } from "@entities/colors/types.ts"
import { FC } from "react"
import { rgbToHex } from "@shared/helpers/rgbToHex.ts"
import { closest } from "color-2-name"
import { getContrastColor } from "@shared/helpers/getContrastColor.ts"

interface Props {
  color: ColorType
}

export const ColorName: FC<Props> = ({ color }) => {
  const hex = rgbToHex(color)

  const { name: colorName } = closest(hex)

  return (
    <ColorNameLayout $color={getContrastColor(color)}>
      {colorName}
    </ColorNameLayout>
  )
}
const ColorNameLayout = styled.span<{
  $color?: string
}>`
  color: ${({ $color }) => $color};
  font-size: 15px;
`
