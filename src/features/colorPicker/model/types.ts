export enum PickerType {
  rgb = "rgb",
  hex = "hex"
}

export interface IPicker {
  color: string
  handleChange: (color: string) => void
}