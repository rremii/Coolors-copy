import { PickerType } from "@features/colorPicker/model/types.ts"

export const pickerNamesByType = new Map<PickerType, string>()
pickerNamesByType.set(PickerType.hex, "Hex")
pickerNamesByType.set(PickerType.rgb, "Rgb")
