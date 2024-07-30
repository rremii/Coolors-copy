import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreatePaletteDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number

  @IsArray()
  @IsNotEmpty()
  colorsHex: string[]

  @IsString()
  @IsNotEmpty()
  name: string
}
