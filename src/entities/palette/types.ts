export interface IPalette {
  id: number
  colors: string //#hex-#hex-#hex ...
  name: string
}

export interface CreatePaletteDto {
  userId: number,
  colorsHex: string[],
  name: string
}
