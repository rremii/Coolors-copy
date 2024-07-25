import styled from "styled-components"
import { ChoosePickerType } from "@features/colorPicker/ui/ChoosePickerType.tsx"
import { PickerFooter } from "@features/colorPicker/ui/PickerFooter.tsx"
import { FC, useState } from "react"
import { PickerType } from "@features/colorPicker/model/types.ts"
import { pickerFabric } from "@features/colorPicker/model/pickerFabric.tsx"

interface Props {
  onColorChange: (color: string) => void
  color: string
}

//todo can be moved to shared !!!
export const ColorPicker: FC<Props> = ({ onColorChange, color }) => {
  const [pickerType, setPickerType] = useState<PickerType>(PickerType.hex)
  const [isPicker, setIsPicker] = useState(true)

  const changeColor = (color) => {
    onColorChange(color)
  }

  const setPicker = (type: PickerType) => {
    setIsPicker(true)
    setPickerType(type)
  }
  const togglePicker = () => {
    setIsPicker((isPicker) => !isPicker)
  }

  const Picker = pickerFabric(pickerType)

  return (
    <PickerLayout>
      <div className="picker-content">
        {isPicker ? (
          <Picker color={color} handleChange={changeColor} />
        ) : (
          <ChoosePickerType onSubmit={setPicker} />
        )}
      </div>
      <PickerFooter
        pickerType={pickerType}
        togglePicker={togglePicker}
        color={color}
        isPicker={isPicker}
      />
    </PickerLayout>
  )
}
const PickerLayout = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  color: black;

  cursor: initial;

  .picker-content {
    width: 100%;
    height: 250px;
  }
`
