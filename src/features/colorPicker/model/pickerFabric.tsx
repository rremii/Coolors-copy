import { IPicker, PickerType } from "@features/colorPicker/model/types.ts"
import { FC } from "react"
import { HEXPickerAdapter } from "@features/colorPicker/model/HEXPickerAdapter.tsx"
import { RGBPickerAdapter } from "@features/colorPicker/model/RGBPickerAdapter.tsx"

export const pickerFabric = (type: PickerType): FC<IPicker> => {

  switch (type) {
    case PickerType.hex:
      return HEXPickerAdapter
    case PickerType.rgb:
      return RGBPickerAdapter
    default:
      return HEXPickerAdapter
  }

}