import { useToast } from "@entities/toast/model/useToast"
import { pickerNamesByType } from "@features/colorPicker/model/pickerNamesByType.ts"
import { PickerType } from "@features/colorPicker/model/types.ts"
import { CopyBtn } from "@shared/ui/colorPicker/CopyBtn.tsx"
import { ToggleBtn } from "@shared/ui/colorPicker/ToggleBtn.tsx"
import { FC } from "react"
import styled from "styled-components"

interface Props {
  togglePicker: () => void
  color: string
  isPicker: boolean
  pickerType: PickerType
}

export const PickerFooter: FC<Props> = ({
  togglePicker,
  color,
  isPicker,
  pickerType,
}) => {
  const { addToast } = useToast()

  const copyColor = () => {
    navigator.clipboard
      .writeText(color)
      .then(() =>
        addToast({
          type: "info",
          content: `Color ${color} is copied`,
        })
      )
      .catch((err) =>
        addToast({ type: "info", content: "Couldn't copy the color" })
      )
  }

  return (
    <FooterLayout>
      <ToggleBtn isActive={!isPicker} onClick={togglePicker}>
        {pickerNamesByType.get(pickerType)}
      </ToggleBtn>
      <CopyBtn onClick={copyColor} />
    </FooterLayout>
  )
}
const FooterLayout = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  height: 50px;
  border-top: rgba(0, 0, 0, 0.23) solid 1px;
`
