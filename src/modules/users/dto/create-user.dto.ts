import { IsEmail, IsHexColor, IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail({}, { message: "invalid email" })
  email: string

  @IsString()
  password: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsHexColor()
  @IsString()
  colorHex: string
}
