import { PickerType } from "@features/colorPicker/model/types.ts"

export const pickerNamesByType = new Map<PickerType, string>()
pickerNamesByType.set(PickerType.hex, "Picker")
pickerNamesByType.set(PickerType.rgb, "Rgb")