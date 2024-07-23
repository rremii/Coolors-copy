import styled from "styled-components"
import { FC } from "react"
import { IPicker } from "@features/colorPicker/model/types.ts"
import { ColorRange } from "@shared/modules/RGBPicker/ColorRange.tsx"
import { ColorChanel } from "@shared/modules/RGBPicker/ColorChanel.tsx"

interface Props {
  color: string
  handleChange: (color: string) => void
}

export const RGBPicker: FC<Props> = ({ color, handleChange }) => {


  return <RGBPickerLayout>
    <ColorChanel name="Red" onColorChange={handleChange} colorHex={color} chanel={"red"} />
    <ColorChanel name="Green" onColorChange={handleChange} colorHex={color} chanel={"green"} />
    <ColorChanel name="Blue" onColorChange={handleChange} colorHex={color} chanel={"blue"} />
  </RGBPickerLayout>
}
const RGBPickerLayout = styled.div`
    padding: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    height: 230px;

`