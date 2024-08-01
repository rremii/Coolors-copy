import { BadRequestException, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CreatePaletteDto } from "./dto/create-palette.dto"
import { ApiError } from "../../common/constants/errors"
import { Palette } from "./entities/palette.entity"
import { UsersService } from "../users/users.service"

@Injectable()
export class PaletteService {
  constructor(
    @InjectRepository(Palette)
    private readonly paletteRepository: Repository<Palette>,
    private readonly userService: UsersService,
  ) {}

  async getAll(userId: number): Promise<Palette[] | null> {
    return this.paletteRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    })
  }

  async create({ userId, colorsHex, name }: CreatePaletteDto) {
    const user = await this.userService.getById(userId)
    if (!user) throw new BadRequestException(ApiError.PALETTE_NOT_CREATED)

    const palette = new Palette()
    palette.colors = colorsHex.join("-")
    palette.name = name
    palette.user = user

    return await palette.save()
  }

  async delete(id: number): Promise<Palette> {
    const palette = await this.paletteRepository.findOneBy({ id })

    if (!palette) throw new BadRequestException(ApiError.PALETTE_NOT_FOUND)

    return await palette.remove()
  }
}
