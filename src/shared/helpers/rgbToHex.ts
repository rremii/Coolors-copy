import { ColorType } from "@entities/colors/types.ts"

export function rgbComponentToHex(c) {
  const hex = c.toString(16)
  return hex.length == 1 ? "0" + hex : hex
}

export function rgbToHex([r, g, b]: ColorType) {
  return (
    "#" + rgbComponentToHex(r) + rgbComponentToHex(g) + rgbComponentToHex(b)
  )
}
