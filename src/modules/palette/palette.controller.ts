import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { PaletteService } from "./palette.service"
import { CreatePaletteDto } from "./dto/create-palette.dto"
import { AccessTokenGuard } from "../../guards/access-token.guard"

@Controller("palette")
export class PaletteController {
  constructor(private readonly paletteService: PaletteService) {}

  @Get("")
  @UsePipes(ValidationPipe)
  @UseGuards(AccessTokenGuard)
  getPalette(@Query("userId", ParseIntPipe) userId: number) {
    return this.paletteService.getAll(userId)
  }

  @Post("")
  @UsePipes(ValidationPipe)
  @UseGuards(AccessTokenGuard)
  createPalette(@Body() createPaletteDto: CreatePaletteDto) {
    return this.paletteService.create(createPaletteDto)
  }

  @Delete(":id")
  @UsePipes(ValidationPipe)
  @UseGuards(AccessTokenGuard)
  deletePalette(@Param("id", ParseIntPipe) paletteId: number) {
    return this.paletteService.delete(paletteId)
  }
}
