import styled from "styled-components"
import { ColorType } from "@entities/colors/types.ts"
import { FC } from "react"
import { rgbToHex } from "@shared/helpers/rgbToHex.ts"
import { closest } from "color-2-name"

interface Props {
  color: ColorType
}

export const ColorName: FC<Props> = ({ color }) => {

  const hex = rgbToHex(color)

  const { name: colorName } = closest(hex)

  return <ColorNameLayout>
    {colorName}
  </ColorNameLayout>
}
const ColorNameLayout = styled.span`



`