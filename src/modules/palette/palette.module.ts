import { Module, NestModule } from "@nestjs/common"
import { PaletteService } from "./palette.service"
import { PaletteController } from "./palette.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Palette } from "./entities/palette.entity"
import { UsersModule } from "../users/users.module"

@Module({
  imports: [TypeOrmModule.forFeature([Palette]), UsersModule],
  exports: [PaletteService],
  providers: [PaletteService],
  controllers: [PaletteController],
})
export class PaletteModule implements NestModule {
  configure() {}
}
