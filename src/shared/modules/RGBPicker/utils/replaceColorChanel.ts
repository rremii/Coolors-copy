import { replaceCharByIndex } from "@shared/modules/RGBPicker/utils/replaceCharByIndex.ts"

export const replaceColorChanel = (
  chanel: "red" | "green" | "blue",
  hexColor: string,
  value: string
) => {
  switch (chanel) {
    case "red":
      return replaceCharByIndex(hexColor, 1, 2, value)
    case "green":
      return replaceCharByIndex(hexColor, 3, 4, value)
    case "blue":
      return replaceCharByIndex(hexColor, 5, 6, value)
  }
}
