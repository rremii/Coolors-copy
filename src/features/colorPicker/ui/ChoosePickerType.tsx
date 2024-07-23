import styled from "styled-components"
import { PickerType } from "@features/colorPicker/model/types.ts"
import { FC } from "react"


interface PickerCell {
  pickerType: PickerType
  content: string
}

interface Props {
  onSubmit: (pickerType: PickerType) => void
}


export const ChoosePickerType: FC<Props> = ({ onSubmit }) => {


  const pickerCells: PickerCell[] = [
    { pickerType: PickerType.hex, content: "HEX" },
    { pickerType: PickerType.rgb, content: "RGB" }
  ]

  return <PickerTypeLayout>
    {pickerCells.map(({ content, pickerType }, index) => {
      return <PickerTypeCell onClick={() => onSubmit(pickerType)} key={index}>{content}</PickerTypeCell>
    })}
  </PickerTypeLayout>
}
const PickerTypeLayout = styled.div`
    //height: 240px;
    display: flex;
    flex-direction: column;
    padding: 10px;
`
const PickerTypeCell = styled.div`
    cursor: pointer;
    display: flex;
    font-weight: 500;
    padding: 10px 12px;
    font-size: 15px;
    border-radius: 6px;
    width: 100%;
    transition: background-color 0.2s;

    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }
`
