import styled from "styled-components"
import { FC } from "react"
import { ToggleBtn } from "@shared/ui/colorPicker/ToggleBtn.tsx"
import { CopyBtn } from "@shared/ui/colorPicker/CopyBtn.tsx"
import { PickerType } from "@features/colorPicker/model/types.ts"
import { pickerNamesByType } from "@features/colorPicker/model/pickerNamesByType.ts"

interface Props {
  togglePicker: () => void
  color: string
  isPicker: boolean
  pickerType: PickerType
}

export const PickerFooter: FC<Props> = ({ togglePicker, color, isPicker, pickerType }) => {


  const copyColor = () => {
    if (color)
      navigator.clipboard.writeText(color)
  }

  return <FooterLayout>
    <ToggleBtn isActive={!isPicker} onClick={togglePicker}>{pickerNamesByType.get(pickerType)}</ToggleBtn>
    <CopyBtn onClick={copyColor} />
  </FooterLayout>
}
const FooterLayout = styled.footer`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    height: 50px;
    border-top: rgba(0, 0, 0, 0.23) solid 1px;
`