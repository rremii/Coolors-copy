import styled from "styled-components"
import { FC } from "react"
import { IPicker } from "@features/colorPicker/model/types.ts"
import { HEXColorPicker } from "@shared/modules/HEXPicker"

export const HEXPickerAdapter: FC<IPicker> = (props) => {
  return (
    <RGBPickerLayout>
      <HEXColorPicker color={props.color} onChange={props.handleChange} />
    </RGBPickerLayout>
  )
}

const RGBPickerLayout = styled.div`
  width: 100%;
  height: 100%;
`
